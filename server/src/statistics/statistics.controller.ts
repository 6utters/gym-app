import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common'
import { StatisticsService } from './statistics.service'
import { CreateStatisticDto } from './dto/create-statistic.dto'
import { CurrentUser } from '../users/users.decorator'
import { AuthGuard } from '../auth/auth.guard'

@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Post()
	@UseGuards(AuthGuard)
	create(
		@CurrentUser('id') id: string,
		@Body() createStatisticDto: CreateStatisticDto,
	) {
		return this.statisticsService.create(createStatisticDto, +id)
	}

	@Get()
	findAll() {
		return this.statisticsService.findAll()
	}

	@Get('search')
	@UseGuards(AuthGuard)
	findAllFromUser(
		@CurrentUser('id') id: string,
		@Query('progId') progId: string,
		@Query('exerId') exerId: string,
	) {
		return this.statisticsService.findAllFromUser(+id, +progId, +exerId)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.statisticsService.remove(+id)
	}
}
