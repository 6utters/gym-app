import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
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
	async create(dto: CreateObjectiveDto, userId: number) {
		const objective = await this.findOne(userId, dto.programId, dto.exerciseId)
		if (!objective) {
			return await this.objectivesRepository.save({
				targetReps: dto.targetReps,
				targetSets: dto.targetSets,
				program: { id: dto.programId },
				user: { id: userId },
				exercise: { id: dto.exerciseId },
				timeout: dto.timeout,
			})
		}
		throw new HttpException(
			'The objective has already been set',
			HttpStatus.BAD_REQUEST,
		)
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

	async update(id, progId, exerId, dto) {
		const objective = await this.findOne(id, progId, exerId)
		return await this.objectivesRepository.save({ ...objective, ...dto })
	}

	async remove(id: number) {
		return await this.objectivesRepository.delete(id)
	}
}
