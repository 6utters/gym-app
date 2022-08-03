import { Injectable } from '@nestjs/common'
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
			relations: { roles: true, user_info: true },
		})
	}

	findByEmail(email: string) {
		return this.usersRepository.findOneBy({ email })
	}

	findById(id: number) {
		return this.usersRepository.findOneBy({ id })
	}
}
