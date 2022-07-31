import { forwardRef, Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'
import { User } from '../users/entities/user.entity'
import { AuthModule } from '../auth/auth.module'

//TODO: Check if User is necessary here

@Module({
	imports: [
		TypeOrmModule.forFeature([Role, User]),
		forwardRef(() => AuthModule),
	],
	controllers: [RolesController],
	providers: [RolesService],
	exports: [RolesService],
})
export class RolesModule {}
