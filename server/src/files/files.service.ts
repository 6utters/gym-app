import { Injectable } from '@nestjs/common'
import { IMediaFileResponse } from './files.interface'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'

@Injectable()
export class FilesService {
	public async saveMedia(
		file: Express.Multer.File,
		folder = 'default',
	): Promise<IMediaFileResponse> {
		const uploadFolder = `${path}/uploads/${folder}`
		await ensureDir(uploadFolder)

		await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
		return {
			url: `/uploads/${folder}/${file.originalname}`,
		}
	}
}
