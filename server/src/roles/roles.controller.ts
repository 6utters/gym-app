import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { Roles } from './roles-auth.decorator'
import { AuthGuard } from '../auth/auth.guard'
import { RolesGuard } from './roles.guard'
import { AddRoleDto } from './dto/add-role.dto'

@Controller('roles')
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@Post()
	// @Roles('ADMIN')
	// @UseGuards(AuthGuard, RolesGuard)
	create(@Body() createRoleDto: CreateRoleDto) {
		return this.rolesService.createRole(createRoleDto)
	}

	@Post('add')
	@Roles('ADMIN')
	@UseGuards(AuthGuard, RolesGuard)
	addRole(@Body() dto: AddRoleDto) {
		return this.rolesService.addRole(dto)
	}

	@Get()
	@Roles('ADMIN')
	@UseGuards(AuthGuard, RolesGuard)
	findAll() {
		return this.rolesService.findAll()
	}

	@Get(':value')
	@Roles('ADMIN')
	@UseGuards(AuthGuard, RolesGuard)
	findByValue(@Param('value') value: string) {
		return this.rolesService.getRoleByValue(value)
	}
}
