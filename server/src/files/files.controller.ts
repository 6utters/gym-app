import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { FilesService } from './files.service'
import { Roles } from '../roles/roles-auth.decorator'
import { AuthGuard } from '../auth/auth.guard'
import { RolesGuard } from '../roles/roles.guard'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post()
	@HttpCode(200)
	@Roles('ADMIN')
	@UseGuards(AuthGuard, RolesGuard)
	@UseInterceptors(FileInterceptor('file'))
	uploadFiles(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder?: string,
	) {
		return this.filesService.saveMedia(file, folder)
	}
}
