import { forwardRef, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { AuthModule } from '../auth/auth.module'
import { Objective } from '../objectives/entities/objective.entity'
import { Statistics } from '../statistics/entities/statistic.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Objective, Statistics]),
		forwardRef(() => AuthModule),
	],
	exports: [UsersService],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
