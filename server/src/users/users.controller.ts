import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { CurrentUser } from './users.decorator'
import { AuthGuard } from '../auth/auth.guard'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto)
	}

	@Get()
	// @Roles('ADMIN')
	// @UseGuards(AuthGuard, RolesGuard)
	findAll() {
		return this.usersService.findAll()
	}

	@Get('profile')
	@UseGuards(AuthGuard)
	findById(@CurrentUser('id') id: number) {
		return this.usersService.findById(id)
	}

	@Get(':name')
	findByName(@Param('name') name: string) {
		return this.usersService.findByName(name)
	}
}
