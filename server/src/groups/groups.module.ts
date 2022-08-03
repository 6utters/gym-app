import { Module } from '@nestjs/common'
import { GroupsService } from './groups.service'
import { GroupsController } from './groups.controller'
import { FilesModule } from '../files/files.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Group } from './entities/group.entity'
import { Exercise } from '../exercises/entities/exercise.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Exercise, Group]), FilesModule],
	exports: [GroupsService],
	controllers: [GroupsController],
	providers: [GroupsService],
})
export class GroupsModule {}
