import { Module } from '@nestjs/common'
import { ProgramsService } from './programs.service'
import { ProgramsController } from './programs.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Exercise } from '../exercises/entities/exercise.entity'
import { Program } from './entities/program.entity'
import { AuthModule } from '../auth/auth.module'
import { FilesModule } from '../files/files.module'
import { ObjectivesModule } from '../objectives/objectives.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([Program, Exercise]),
		AuthModule,
		FilesModule,
		ObjectivesModule,
	],
	controllers: [ProgramsController],
	providers: [ProgramsService],
})
export class ProgramsModule {}
