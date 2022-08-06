import { Module } from '@nestjs/common'
import { ObjectivesService } from './objectives.service'
import { ObjectivesController } from './objectives.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Objective } from './entities/objective.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
	imports: [TypeOrmModule.forFeature([User, Objective]), AuthModule],
	controllers: [ObjectivesController],
	providers: [ObjectivesService],
})
export class ObjectivesModule {}
