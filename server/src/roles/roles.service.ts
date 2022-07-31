import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { AddRoleDto } from './dto/add-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from './entities/role.entity'
import { User } from '../users/entities/user.entity'

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
		@InjectRepository(User) private readonly usersRepository: Repository<User>,
	) {}

	async createRole(dto: CreateRoleDto) {
		return await this.rolesRepository.save(dto)
	}

	async addRole(dto: AddRoleDto) {
		const user = await this.usersRepository.findOne({
			where: { userName: dto.userName },
			relations: { roles: true },
		})
		const role = await this.getRoleByValue(dto.value)
		if (user && role) {
			user.roles.push(role)
			return await this.usersRepository.save(user)
		}
		throw new HttpException(
			"User or Role hasn't been found",
			HttpStatus.NOT_FOUND,
		)
	}

	findAll() {
		return this.rolesRepository.find()
	}

	async getRoleByValue(value: string) {
		return await this.rolesRepository.findOne({ where: { value } })
	}
}
