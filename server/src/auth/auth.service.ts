import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcryptjs'
import { UserDto } from './dto/user.dto'
import { TokensService } from './tokens.service'
import { LoginDto } from './dto/login.dto'
import { RolesService } from '../roles/roles.service'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>,
		private usersService: UsersService,
		private tokensService: TokensService,
		private rolesService: RolesService,
	) {}

	public async register(dto: CreateUserDto) {
		const candidateByEmail = await this.usersService.findByEmail(dto.email)
		if (candidateByEmail) {
			throw new HttpException(
				'User with this email already exists',
				HttpStatus.BAD_REQUEST,
			)
		}
		const candidateByName = await this.usersRepository.findOneBy({
			userName: dto.userName,
		})
		if (candidateByName) {
			throw new HttpException(
				'User with this name already exists',
				HttpStatus.BAD_REQUEST,
			)
		}
		const hashedPassword = await bcrypt.hash(dto.password, 3)
		const user = await this.usersService.create({
			...dto,
			password: hashedPassword,
		})
		const role = await this.rolesService.getRoleByValue('ADMIN')
		user.roles = [role]
		const userWithRoles = await this.usersRepository.save(user)

		return await this.getCredentials(userWithRoles)
	}

	public async login(dto: LoginDto) {
		const user = await this.usersRepository.findOne({
			where: { email: dto.email },
			select: ['id', 'email', 'password', 'userName', 'roles'],
			relations: { roles: true },
		})
		if (!user) {
			throw new HttpException(
				'Invalid email or password',
				HttpStatus.BAD_REQUEST,
			)
		}
		const isPassEqual = await bcrypt.compare(dto.password, user.password)
		if (!isPassEqual) {
			throw new HttpException(
				'Invalid email or password',
				HttpStatus.BAD_REQUEST,
			)
		}
		return await this.getCredentials(user)
	}

	public async logout(refreshToken: string) {
		return await this.tokensService.removeToken(refreshToken)
	}

	public async getCredentials(user: User) {
		const userDto = new UserDto(user)
		const tokens = await this.tokensService.generateTokes({ ...userDto })
		await this.tokensService.saveToken(userDto.id, tokens.refreshToken)
		return {
			...tokens,
			user: userDto,
		}
	}
}
