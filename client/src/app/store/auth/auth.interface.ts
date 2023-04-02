import { IAuthData } from '../../../types/authData.interface'

export interface IAuthInitialState extends IAuthData {
	isLoading: boolean
	error: string
}

export interface ILoginFields {
	email: string
	password: string
}

export interface ISighUpFields extends ILoginFields {
	userName: string
}
