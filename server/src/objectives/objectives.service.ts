import { Injectable } from '@nestjs/common'
import { CreateObjectiveDto } from './dto/create-objective.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Objective } from './entities/objective.entity'

@Injectable()
export class ObjectivesService {
	constructor(
		@InjectRepository(Objective)
		private readonly objectivesRepository: Repository<Objective>,
	) {}
	async create(dto: CreateObjectiveDto) {
		//Todo: to find more appropriate way to handle this
		return await this.objectivesRepository.save({
			targetReps: dto.targetSets,
			targetSets: dto.targetSets,
			program: { id: dto.programId },
			user: { id: dto.userId },
			exercise: { id: dto.exerciseId },
			timeout: dto.timeout,
		})
	}

	async findAll() {
		return await this.objectivesRepository.find({
			relations: { user: true, exercise: true, program: true },
		})
	}

	async findOne(userId, programId, exerciseId) {
		return await this.objectivesRepository.findOne({
			where: {
				user: { id: userId },
				program: { id: programId },
				exercise: { id: exerciseId },
			},
		})
	}

	update() {}

	async remove(id: number) {
		return await this.objectivesRepository.delete(id)
	}
}
