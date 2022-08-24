import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { ProgramsService } from './programs.service'
import { CreateProgramDto } from './dto/create-program.dto'
import { UpdateProgramDto } from './dto/update-program.dto'
import { AuthGuard } from '../auth/auth.guard'
import { CurrentUser } from '../users/users.decorator'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('programs')
export class ProgramsController {
	constructor(private readonly programsService: ProgramsService) {}

	@Post()
	@UseGuards(AuthGuard)
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('image'))
	async create(
		@CurrentUser('id') id: string,
		@Body() createProgramDto: CreateProgramDto,
		@UploadedFile() image: Express.Multer.File,
		@Query('folder') folder?: string,
	) {
		return this.programsService.create(createProgramDto, +id, image, folder)
	}

	@Get()
	findAll() {
		return this.programsService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.programsService.findOne(+id)
	}

	@Get('from/user')
	@UseGuards(AuthGuard)
	findFromUser(@CurrentUser('id') id: number) {
		return this.programsService.findAllFromUser(id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
		return this.programsService.update(+id, updateProgramDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.programsService.remove(+id)
	}
}
