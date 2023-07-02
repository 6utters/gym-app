import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateProgramDto } from './dto/create-program.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Program } from './entities/program.entity'
import { Exercise } from '../exercises/entities/exercise.entity'
import { FilesService } from '../files/files.service'
import { ObjectivesService } from '../objectives/objectives.service'
import { CreateObjectiveDto } from '../objectives/dto/create-objective.dto'

@Injectable()
export class ProgramsService {
	constructor(
		@InjectRepository(Program)
		private readonly programsRepository: Repository<Program>,
		@InjectRepository(Exercise)
		private readonly exercisesRepository: Repository<Exercise>,
		private readonly filesService: FilesService,
		private readonly objectivesService: ObjectivesService,
	) {}
	async create(
		dto: CreateProgramDto,
		userId: number,
		file: Express.Multer.File,
	) {
		const thumbnail = await this.filesService.saveMedia(file, 'program')
		const program = await this.programsRepository.create({
			name: dto.name,
			userId,
			image_path: thumbnail.url,
		})
		const exerciseArray = JSON.parse(dto.exerciseIds)
		program.exercises = await this.exercisesRepository.find({
			where: { id: In(exerciseArray) },
		})
		await this.programsRepository.save(program)
		const objectives: CreateObjectiveDto[] = JSON.parse(dto.objectives)
		if (exerciseArray.length !== objectives.length) {
			const objectiveExIds = objectives.map(obj => obj.exerciseId)
			const difference: number[] = exerciseArray.filter(
				x => !objectiveExIds.includes(x),
			)
			const defaultObjectives = difference.map(id => {
				return {
					programId: program.id,
					exerciseId: id,
					targetReps: 12,
					targetSets: 3,
					timeout: 90000,
				} as CreateObjectiveDto
			})
			program.objectives = await Promise.all(
				[...objectives, ...defaultObjectives].map(async objective => {
					return await this.objectivesService.create(
						{
							programId: program.id,
							exerciseId: objective.exerciseId,
							timeout: objective.timeout,
							targetReps: objective.targetReps,
							targetSets: objective.targetSets,
						},
						userId,
					)
				}),
			)
			return await this.programsRepository.save(program)
		}
		program.objectives = await Promise.all(
			objectives.map(async objective => {
				return await this.objectivesService.create(
					{
						programId: program.id,
						exerciseId: objective.exerciseId,
						timeout: objective.timeout,
						targetReps: objective.targetReps,
						targetSets: objective.targetSets,
					},
					userId,
				)
			}),
		)
		return await this.programsRepository.save(program)
	}

	async complete(userId: string, programId: number) {
		try {
			const program = await this.findOneFromUser(+userId, programId)

			if (!program) {
				throw new Error()
			}
			const todayDate = new Date()

			program.completedDate = todayDate
			await this.programsRepository.save(program)
		} catch (e) {
			throw new HttpException(
				'No such program has been found',
				HttpStatus.NOT_FOUND,
			)
		}
	}

	findAll() {
		return this.programsRepository.find({
			relations: {
				userId: true,
				exercises: true,
				objectives: { exercise: true },
			},
		})
	}

	findAllFromUser(id: number) {
		return this.programsRepository.find({
			where: { userId: id },
			relations: {
				exercises: true,
				objectives: { exercise: true },
			},
		})
	}

	async findOneFromUser(userId: number, programId: number) {
		return await this.programsRepository.findOne({
			where: { userId, id: programId },
			relations: {
				exercises: true,
				objectives: { exercise: true },
			},
		})
	}

	async findOne(id: number) {
		try {
			return await this.programsRepository.findOneOrFail({
				where: { id },
				relations: {
					userId: true,
					exercises: true,
					statistics: { exercise: true },
					objectives: { exercise: true },
				},
			})
		} catch (e) {
			throw new HttpException(
				'No such program has been found',
				HttpStatus.NOT_FOUND,
			)
		}
	}

	async getExerciseIdsByProgram(userId: number, programId: number) {
		try {
			const program = await this.programsRepository.findOneOrFail({
				where: {
					id: programId,
				},
				relations: {
					exercises: true,
				},
			})
			return program.exercises
		} catch (e) {
			throw new HttpException(
				'No such exercise in this program.',
				HttpStatus.NOT_FOUND,
			)
		}
	}

	async update(programId, dto) {
		const program = await this.findOne(programId)
		return await this.programsRepository.save({ ...program, ...dto })
	}

	async remove(id: number) {
		return await this.programsRepository.delete(id)
	}
}
