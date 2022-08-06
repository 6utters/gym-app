import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common'
import { UsersInfoService } from './users-info.service'
import { UpdateUsersInfoDto } from './dto/update-users-info.dto'
import { CurrentUser } from '../users/users.decorator'
import { AuthGuard } from '../auth/auth.guard'

@Controller('users-info')
export class UsersInfoController {
	constructor(private readonly usersInfoService: UsersInfoService) {}

	@Post()
	create() {
		return this.usersInfoService.create()
	}

	@Get()
	findAll() {
		return this.usersInfoService.findAll()
	}

	@Get('search')
	@UseGuards(AuthGuard)
	findOne(@CurrentUser('id') id: string) {
		return this.usersInfoService.findOne(+id)
	}

	@Patch('update')
	update(
		@CurrentUser('id') id: string,
		@Body() updateUsersInfoDto: UpdateUsersInfoDto,
	) {
		return this.usersInfoService.update(+id, updateUsersInfoDto)
	}
}
