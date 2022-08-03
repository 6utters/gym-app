import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { UsersInfoService } from './users-info.service'
import { UpdateUsersInfoDto } from './dto/update-users-info.dto'

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

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersInfoService.findOne(+id)
	}

	@Patch(':id')
	update(
		@Param('id') id: number,
		@Body() updateUsersInfoDto: UpdateUsersInfoDto,
	) {
		return this.usersInfoService.update(id, updateUsersInfoDto)
	}
}
