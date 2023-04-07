import { User } from '@/entities/User'

export interface AuthByEmailSchema {
	isLoading: boolean
	error?: string
}

export interface AuthByEmailResponse {
	accessToken: string
	user: User
}
