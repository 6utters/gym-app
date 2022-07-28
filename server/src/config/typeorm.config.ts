import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

export const getTypeOrmConfig = async (
	configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: 'localhost',
	port: configService.get('POSTGRES_PORT'),
	database: configService.get('POSTGRES_DB'),
	username: configService.get('POSTGRES_USER'),
	password: configService.get('POSTGRES_PASSWORD'),
	autoLoadEntities: true,
	synchronize: true,
})
