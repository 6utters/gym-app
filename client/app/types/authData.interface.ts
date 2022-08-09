import { IRole } from './role.interface'

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IAuthData extends ITokens {
	user: {
		id: string
		email: string
		userName: string
		roles: IRole[]
	} | null
}
