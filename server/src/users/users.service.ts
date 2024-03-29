import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>,
	) {}

	create(createUserDto: CreateUserDto) {
		return this.usersRepository.save(createUserDto)
	}

	async findAll() {
		return await this.usersRepository.find({
			relations: {
				roles: true,
				user_info: true,
				objectives: { program: true },
				programs: true,
			},
		})
	}

	findByEmail(email: string) {
		return this.usersRepository.findOneBy({ email })
	}

	findByName(userName: string) {
		return this.usersRepository.findOneOrFail({
			where: { userName },
			relations: { roles: true, objectives: true, user_info: true },
		})
	}

	findById(id: number) {
		try {
			return this.usersRepository.findOneOrFail({
				where: { id },
				relations: {
					roles: true,
					user_info: true,
				},
			})
		} catch (e) {
			throw new HttpException(
				"User with that Id doesn't exist",
				HttpStatus.NOT_FOUND,
			)
		}
	}
}
