import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from './entities/role.entity'

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
	) {}

	async createRole(dto: CreateRoleDto) {
		return await this.rolesRepository.save(dto)
	}

	findAll() {
		return this.rolesRepository.find()
	}

	async getRoleByValue(value: string) {
		return await this.rolesRepository.findOne({ where: { value } })
	}

	update(id: number, updateRoleDto: UpdateRoleDto) {
		return `This action updates a #${id} role`
	}

	remove(id: number) {
		return `This action removes a #${id} role`
	}
}
