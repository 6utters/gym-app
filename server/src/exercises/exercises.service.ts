import { Injectable } from '@nestjs/common'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { UpdateExerciseDto } from './dto/update-exercise.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Exercise } from './entities/exercise.entity'
import { Warning } from './entities/warning.entity'
import { Instruction } from './entities/instruction.entity'
import { FilesService } from '../files/files.service'
import { GroupsService } from '../groups/groups.service'

@Injectable()
export class ExercisesService {
	constructor(
		@InjectRepository(Exercise)
		private readonly exercisesRepository: Repository<Exercise>,
		@InjectRepository(Warning)
		private readonly warningsRepository: Repository<Warning>,
		@InjectRepository(Instruction)
		private readonly instructionsRepository: Repository<Instruction>,
		private filesService: FilesService,
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

	async findAll() {
		return await this.exercisesRepository.find({
			relations: { group: true, warnings: true, instructions: true },
		})
	}

	async findOne(id: number) {
		return await this.exercisesRepository.findOneBy({ id })
	}

	update(id: number, updateExerciseDto: UpdateExerciseDto) {
		return `This action updates a #${id} exercise`
	}

	async remove(id: number) {
		return await this.exercisesRepository.delete(id)
	}
}
