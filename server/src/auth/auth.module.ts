import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { UsersModule } from '../users/users.module'
import { TokensService } from './tokens.service'
import { JwtService } from '@nestjs/jwt'
import { Tokens } from './entities/tokens.entity'
import { RolesModule } from '../roles/roles.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Tokens]),
		forwardRef(() => UsersModule),
		RolesModule,
	],
	controllers: [AuthController],
	providers: [AuthService, TokensService, JwtService],
	exports: [AuthService, TokensService],
})
export class AuthModule {}
