import { Module } from '@nestjs/common'
import { FilesService } from './files.service'
import { FilesController } from './files.controller'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { AuthModule } from '../auth/auth.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads',
		}),
		AuthModule,
	],
	exports: [FilesService],
	controllers: [FilesController],
	providers: [FilesService],
})
export class FilesModule {}
