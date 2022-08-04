import { Module } from '@nestjs/common'
import { ExercisesService } from './exercises.service'
import { ExercisesController } from './exercises.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Group } from '../groups/entities/group.entity'
import { Exercise } from './entities/exercise.entity'
import { Warning } from './entities/warning.entity'
import { Instruction } from './entities/instruction.entity'
import { FilesModule } from '../files/files.module'
import { GroupsModule } from '../groups/groups.module'
import { Objective } from '../objectives/entities/objective.entity'
import { Program } from '../programs/entities/program.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Exercise,
			Warning,
			Instruction,
			Group,
			Objective,
			Program,
		]),
		FilesModule,
		GroupsModule,
	],
	controllers: [ExercisesController],
	providers: [ExercisesService],
})
export class ExercisesModule {}
