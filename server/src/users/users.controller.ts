import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { AuthGuard } from '../auth/auth.guard'
import { Roles } from '../roles/roles-auth.decorator'
import { RolesGuard } from '../roles/roles.guard'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto)
	}

	@Get()
	@Roles('ADMIN')
	@UseGuards(AuthGuard, RolesGuard)
	findAll() {
		return this.usersService.findAll()
	}
}
