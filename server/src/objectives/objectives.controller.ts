import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common'
import { ObjectivesService } from './objectives.service'
import { CreateObjectiveDto } from './dto/create-objective.dto'
import { UpdateObjectiveDto } from './dto/update-objective.dto'
import { AuthGuard } from '../auth/auth.guard'
import { CurrentUser } from '../users/users.decorator'

@Controller('objectives')
export class ObjectivesController {
	constructor(private readonly objectivesService: ObjectivesService) {}

	@Post()
	@UseGuards(AuthGuard)
	create(
		@CurrentUser('id') id: string,
		@Body() createObjectiveDto: CreateObjectiveDto,
	) {
		return this.objectivesService.create(createObjectiveDto, +id)
	}

	@Get()
	findAll() {
		return this.objectivesService.findAll()
	}

	@Get('search')
	findOne(
		@Query('userId') userId: string,
		@Query('progId') progId: string,
		@Query('exerId') exerId: string,
	) {
		return this.objectivesService.findOne(+userId, +progId, +exerId)
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateObjectiveDto: UpdateObjectiveDto,
	) {
		return this.objectivesService.update()
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.objectivesService.remove(+id)
	}
}
