import { IsString } from 'class-validator'

export class UpdateUserDto {
	@IsString({ message: 'Must be a string' })
	readonly userName: string
}
