import { IsArray, IsEmail, IsNumber, IsString } from 'class-validator'

export class UserDto {
	@IsEmail()
	email: string
	@IsNumber()
	id: number
	@IsString()
	userName: string
	@IsArray()
	roles: []

	constructor(model) {
		this.email = model.email
		this.id = model.id
		this.userName = model.userName
		this.roles = model.roles
	}
}
