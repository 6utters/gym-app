import { Injectable } from '@nestjs/common'
import { CreateStatisticDto } from './dto/create-statistic.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Statistics } from './entities/statistic.entity'

@Injectable()
export class StatisticsService {
	constructor(
		@InjectRepository(Statistics)
		private readonly statisticsRepository: Repository<Statistics>,
	) {}
	async create(dto: CreateStatisticDto) {
		return await this.statisticsRepository.save({
			repetitions: dto.repetitions,
			user: { id: dto.userId },
			program: { id: dto.programId },
			exercise: { id: dto.exerciseId },
		})
	}

	async findAll() {
		return await this.statisticsRepository.find({
			relations: { program: true, exercise: true, user: true },
		})
	}

	findOne(id: number) {
		return `This action returns a #${id} statistic`
	}

	update() {}

	remove(id: number) {
		return `This action removes a #${id} statistic`
	}
}
