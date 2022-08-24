import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { GroupsService } from './groups.service'
import { CreateGroupDto } from './dto/create-group.dto'
import { UpdateGroupDto } from './dto/update-group.dto'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('groups')
export class GroupsController {
	constructor(private readonly groupsService: GroupsService) {}

	@Post()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('thumbnail'))
	create(
		@Body() createGroupDto: CreateGroupDto,
		@UploadedFile() thumbnail: Express.Multer.File,
	) {
		return this.groupsService.create(createGroupDto, thumbnail)
	}

	@Get()
	findAll() {
		return this.groupsService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.groupsService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
		return this.groupsService.update(+id, updateGroupDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.groupsService.remove(+id)
	}
}
