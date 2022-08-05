import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common'
import { ExercisesService } from './exercises.service'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { UpdateExerciseDto } from './dto/update-exercise.dto'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

@Controller('exercises')
export class ExercisesController {
	constructor(private readonly exercisesService: ExercisesService) {}

	@Post()
	@HttpCode(200)
	@UseInterceptors(
		FileFieldsInterceptor([{ name: 'thumbnail' }, { name: 'video' }]),
	)
	create(
		@Body() createExerciseDto: CreateExerciseDto,
		@UploadedFiles()
		files: {
			thumbnail?: Express.Multer.File[]
			video?: Express.Multer.File[]
		},
	) {
		return this.exercisesService.create(
			createExerciseDto,
			files.thumbnail[0],
			files.video[0],
		)
	}

	@Get()
	findAll() {
		return this.exercisesService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.exercisesService.findOne(+id)
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateExerciseDto: UpdateExerciseDto,
	) {
		return this.exercisesService.update()
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.exercisesService.remove(+id)
	}
}
