import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Exercise } from './entities/exercise.entity'
import { Warning } from './entities/warning.entity'
import { Instruction } from './entities/instruction.entity'
import { FilesService } from '../files/files.service'
import { GroupsService } from '../groups/groups.service'
import { UpdateExerciseDto } from './dto/update-exercise.dto'
import { Program } from '../programs/entities/program.entity'
import { ProgramsService } from '../programs/programs.service'

@Injectable()
export class ExercisesService {
	constructor(
		@InjectRepository(Exercise)
		private readonly exercisesRepository: Repository<Exercise>,
		@InjectRepository(Warning)
		private readonly warningsRepository: Repository<Warning>,
		@InjectRepository(Instruction)
		private readonly instructionsRepository: Repository<Instruction>,
		@InjectRepository(Program)
		private readonly programsRepository: Repository<Program>,
		private filesService: FilesService,
		private programsService: ProgramsService,
		private groupsService: GroupsService,
	) {}

	async create(dto: CreateExerciseDto, thumbnailFile, videoFile) {
		const thumbnail = await this.filesService.saveMedia(
			thumbnailFile,
			'ex-thumbnail',
		)
		const video = await this.filesService.saveMedia(videoFile, 'ex-video')
		const exercise = await this.exercisesRepository.create({
			name: dto.name,
			description: dto.description,
			thumbnailPath: thumbnail.url,
			videoPath: video.url,
		})

		exercise.group = await this.groupsService.findByName(dto.group)

		exercise.warnings = await Promise.all(
			dto.warnings.map(async warning => {
				return await this.warningsRepository.save({ warning })
			}),
		)
		exercise.instructions = await Promise.all(
			dto.instructions.map(async instruction => {
				return await this.instructionsRepository.save({ instruction })
			}),
		)
		return await this.exercisesRepository.save(exercise)
	}

	async findByGroup(groupId: number) {
		return await this.exercisesRepository.find({
			where: { group: { id: groupId } },
			relations: { warnings: true, instructions: true },
		})
	}

	async findByIds(ids: number[]) {
		if (ids) {
			return await this.exercisesRepository.find({
				where: { id: In(ids) },
				relations: {
					warnings: true,
					instructions: true,
					objectives: true,
				},
			})
		}
	}

	async findAll() {
		return await this.exercisesRepository.find({
			relations: {
				group: true,
				warnings: true,
				instructions: true,
				objectives: true,
			},
		})
	}

	async getExercisesByProgram(userId: number, programId: number) {
		try {
			const exercises = await this.programsService.getExerciseIdsByProgram(
				userId,
				programId,
			)
			return exercises.map(exercise => exercise.id)
		} catch (e) {
			throw new HttpException(
				'No such exercise in this program.',
				HttpStatus.NOT_FOUND,
			)
		}
	}

	async findOne(id: number) {
		try {
			return await this.exercisesRepository.findOneOrFail({
				where: { id },
				relations: { warnings: true, instructions: true, group: true },
			})
		} catch (e) {
			throw new HttpException(
				'No such exercise has been found',
				HttpStatus.NOT_FOUND,
			)
		}
	}

	async update(dto: UpdateExerciseDto) {
		const exercise = await this.exercisesRepository.findOneOrFail({
			where: { name: dto.name },
		})
		return await this.exercisesRepository.save({ ...exercise, ...dto })
	}

	async remove(id: number) {
		return await this.exercisesRepository.delete(id)
	}
}
