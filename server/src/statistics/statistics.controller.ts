import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common'
import { StatisticsService } from './statistics.service'
import { CreateStatisticDto } from './dto/create-statistic.dto'

@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Post()
	create(@Body() createStatisticDto: CreateStatisticDto) {
		return this.statisticsService.create(createStatisticDto)
	}

	@Get()
	findAll() {
		return this.statisticsService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
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
