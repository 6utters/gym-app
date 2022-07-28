import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getTypeOrmConfig } from './config/typeorm.config'

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeOrmConfig,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
