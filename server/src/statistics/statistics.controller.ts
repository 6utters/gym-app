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

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.statisticsService.findOne(+id)
	}

	@Patch(':id')
	update() {
		return this.statisticsService.update()
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.statisticsService.remove(+id)
	}
}
