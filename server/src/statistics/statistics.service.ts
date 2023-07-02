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
	async create(dto: CreateStatisticDto, userId: number) {
		return await this.statisticsRepository.save({
			repetitions: dto.repetitions,
			user: { id: userId },
			program: { id: dto.programId },
			exercise: { id: dto.exerciseId },
		})
	}

	async findAll() {
		return await this.statisticsRepository.find({
			relations: { program: true, exercise: true, user: true },
		})
	}

	async findAllFromUser(userId, programId, exerciseId) {
		return await this.statisticsRepository.find({
			where: {
				user: { id: userId },
				program: { id: programId },
				exercise: { id: exerciseId },
			},
		})
	}

	async remove(id: number) {
		return await this.statisticsRepository.delete(id)
	}
}
