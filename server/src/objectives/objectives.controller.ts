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
	@UseGuards(AuthGuard)
	findOne(
		@CurrentUser('id') id: string,
		@Query('progId') progId: string,
		@Query('exerId') exerId: string,
	) {
		return this.objectivesService.findOne(+id, +progId, +exerId)
	}

	@Patch('update')
	@UseGuards(AuthGuard)
	update(
		@Body() updateObjectiveDto: UpdateObjectiveDto,
		@CurrentUser('id') id: string,
		@Query('progId') progId: string,
		@Query('exerId') exerId: string,
	) {
		return this.objectivesService.update(
			+id,
			+progId,
			+exerId,
			updateObjectiveDto,
		)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.objectivesService.remove(+id)
	}
}
