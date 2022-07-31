import { IsEmail, IsString, Length } from 'class-validator'

export class LoginDto {
	@IsString({ message: 'Must be a string' })
	@IsEmail({}, { message: 'Invalid email' })
	readonly email: string
	@IsString({ message: 'Must be a string' })
	@Length(6, 18, {
		message: 'password should be more than 4 and less than 18 symbols',
	})
	readonly password: string
}
