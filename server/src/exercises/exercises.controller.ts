import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query,
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

	@Get('gr/:id')
	findByMuscleGroup(@Param('id') id: number) {
		return this.exercisesService.findByGroup(id)
	}

	@Get()
	findByIds(@Query('ids') ids: number[]) {
		return this.exercisesService.findByIds(ids)
	}

	// @Get()
	// findAll() {
	// 	return this.exercisesService.findAll()
	// }

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.exercisesService.findOne(id)
	}

	@Patch('update')
	update(@Body() updateExerciseDto: UpdateExerciseDto) {
		return this.exercisesService.update(updateExerciseDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.exercisesService.remove(+id)
	}
}
