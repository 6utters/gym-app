import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Repository } from 'typeorm'
import { Tokens } from './entities/tokens.entity'
import { UserDto } from './dto/user.dto'

@Injectable()
export class TokensService {
	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>,
		@InjectRepository(Tokens)
		private readonly tokensRepository: Repository<Tokens>,
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	public async generateTokes(payload) {
		const accessToken = this.jwtService.sign(payload, {
			secret: process.env.JWT_ACCESS_SECRET,
			expiresIn: '30m',
		})
		const refreshToken = this.jwtService.sign(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: '30d',
		})
		return {
			accessToken,
			refreshToken,
		}
	}

	public async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
		}
		const userData = await this.validateRefreshToken(refreshToken)
		const currentToken = await this.findToken(refreshToken)
		if (!userData || !currentToken) {
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
		}
		const user = await this.usersService.findById(userData.id)
		const userDto = new UserDto(user)
		const tokens = await this.generateTokes({ ...userDto })
		await this.saveToken(userDto.id, tokens.refreshToken)
		return {
			...tokens,
			user: userDto,
		}
	}

	public validateAccessToken(accessToken: string) {
		try {
			return this.jwtService.verify(accessToken, {
				secret: process.env.JWT_ACCESS_SECRET,
			})
		} catch (e) {
			return null
		}
	}

	public validateRefreshToken(refreshToken: string) {
		try {
			return this.jwtService.verify(refreshToken, {
				secret: process.env.JWT_REFRESH_SECRET,
			})
		} catch (e) {
			return null
		}
	}

	public async findToken(refreshToken: string) {
		return await this.tokensRepository.findOneBy({ refreshToken })
	}

	public async removeToken(refreshToken: string) {
		return await this.tokensRepository.delete({ refreshToken })
	}

	public async saveToken(userId, refreshToken) {
		const tokenData = await this.tokensRepository.findOne({ where: userId })
		if (tokenData) {
			tokenData.refreshToken = refreshToken
			return this.tokensRepository.save(tokenData)
		}
		return await this.tokensRepository.save({ refreshToken, userId })
	}
}
