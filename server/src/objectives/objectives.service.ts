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
		return await this.objectivesRepository.save(dto)
	}

	async findAll() {
		return await this.objectivesRepository.find({
			relations: { userId: true, exerciseId: true },
		})
	}

	findOne(id: number) {
		return `This action returns a #${id} objective`
	}

	update() {}

	remove(id: number) {
		return `This action removes a #${id} objective`
	}
}
