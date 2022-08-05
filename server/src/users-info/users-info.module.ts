import { forwardRef, Module } from '@nestjs/common'
import { UsersInfoService } from './users-info.service'
import { UsersInfoController } from './users-info.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { User_info } from './entities/users-info.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([User_info, User]),
		forwardRef(() => AuthModule),
	],
	controllers: [UsersInfoController],
	providers: [UsersInfoService],
	exports: [UsersInfoService],
})
export class UsersInfoModule {}
