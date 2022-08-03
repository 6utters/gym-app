import { Injectable } from '@nestjs/common'
import { CreateGroupDto } from './dto/create-group.dto'
import { UpdateGroupDto } from './dto/update-group.dto'
import { FilesService } from '../files/files.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Group } from './entities/group.entity'

@Injectable()
export class GroupsService {
	constructor(
		@InjectRepository(Group)
		private readonly groupsRepository: Repository<Group>,
		private filesService: FilesService,
	) {}
	async create(
		dto: CreateGroupDto,
		file: Express.Multer.File,
		folder = 'default',
	) {
		const thumbnail = await this.filesService.saveMedia(file, folder)
		const groupDto = { ...dto, thumbnailPath: thumbnail.url }
		return this.groupsRepository.save(groupDto)
	}

	async findAll() {
		return await this.groupsRepository.find()
	}

	async findByName(name: string) {
		return await this.groupsRepository.findOneBy({ name })
	}

	async findOne(id: number) {
		return await this.groupsRepository.findOne({ where: { id } })
	}

	update(id: number, updateGroupDto: UpdateGroupDto) {
		return `This action updates a #${id} group`
	}

	async remove(id: number) {
		return await this.groupsRepository.delete(id)
	}
}
