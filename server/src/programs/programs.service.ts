import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateProgramDto } from './dto/create-program.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Program } from './entities/program.entity'
import { Exercise } from '../exercises/entities/exercise.entity'

@Injectable()
export class ProgramsService {
	constructor(
		@InjectRepository(Program)
		private readonly programsRepository: Repository<Program>,
		@InjectRepository(Exercise)
		private readonly exercisesRepository: Repository<Exercise>,
	) {}
	async create(dto: CreateProgramDto) {
		const program = await this.programsRepository.create({
			name: dto.name,
			userId: dto.userId,
		})
		program.exercises = await this.exercisesRepository.find({
			where: { id: In(dto.exerciseIds) },
		})
		return await this.programsRepository.save(program)
	}

	findAll() {
		return this.programsRepository.find({
			relations: { userId: true, exercises: true, objectives: true },
		})
	}

	async findOne(id: number) {
		try {
			return await this.programsRepository.findOneOrFail({
				where: { id },
				relations: { userId: true, exercises: true },
			})
		} catch (e) {
			throw new HttpException(
				'No such program has been found',
				HttpStatus.NOT_FOUND,
			)
		}
	}

	//TODO: update program

	update() {}

	async remove(id: number) {
		return await this.programsRepository.delete(id)
	}
}
