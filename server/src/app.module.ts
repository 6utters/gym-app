import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getTypeOrmConfig } from './config/typeorm.config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { RolesModule } from './roles/roles.module';
import { FilesModule } from './files/files.module';

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeOrmConfig,
		}),
		UsersModule,
		AuthModule,
		RolesModule,
		FilesModule,
	],
})
export class AppModule {}
