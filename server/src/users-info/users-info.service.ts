import { Injectable } from '@nestjs/common'
import { UpdateUsersInfoDto } from './dto/update-users-info.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User_info } from './entities/users-info.entity'

@Injectable()
export class UsersInfoService {
	constructor(
		@InjectRepository(User_info)
		private readonly usersInfoRepository: Repository<User_info>,
	) {}
	async create() {
		const defaultValues = {
			height: 0,
			weight: 0,
			age: 0,
			gender: 'default',
		}
		return await this.usersInfoRepository.save(defaultValues)
	}

	async findAll() {
		return await this.usersInfoRepository.find()
	}

	findOne(id: number) {
		return `This action returns a #${id} usersInfo`
	}

	async update(userId: number, dto: UpdateUsersInfoDto) {
		const info = await this.usersInfoRepository.findOne({
			where: { userId: { id: userId } },
		})

		return await this.usersInfoRepository.save({ ...info, ...dto })
	}

	remove(id: number) {
		return `This action removes a #${id} usersInfo`
	}
}
