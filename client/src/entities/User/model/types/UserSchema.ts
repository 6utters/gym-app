import { UserRole } from '../consts/userRoles'
import { Program } from '@/entities/Program'
import { UserInfo } from '@/entities/UserInfo'

export interface User {
	id: number
	userName: string
	email: string
	user_info: UserInfo
	roles: UserRole[]
	programs: Program[]
	statistics: any[]
	objectives: any[]
}

export interface UserSchema {
	authData?: User
}
