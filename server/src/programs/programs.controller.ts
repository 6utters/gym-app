import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ProgramsService } from './programs.service'
import { CreateProgramDto } from './dto/create-program.dto'
import { UpdateProgramDto } from './dto/update-program.dto'
import { AuthGuard } from '../auth/auth.guard'
import { CurrentUser } from '../users/users.decorator'

@Controller('programs')
export class ProgramsController {
	constructor(private readonly programsService: ProgramsService) {}

	@Post()
	@UseGuards(AuthGuard)
	create(
		@CurrentUser('id') id: string,
		@Body() createProgramDto: CreateProgramDto,
	) {
		return this.programsService.create(createProgramDto, +id)
	}

	@Get()
	findAll() {
		return this.programsService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.programsService.findOne(+id)
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
