import { UserRole } from '../consts/userRoles'

export interface User {
	id: number
	userName: string
	email: string
	roles: UserRole[]
	programs: any[]
	user_info: any[]
	statistics: any[]
	objectives: any[]
}

export interface UserSchema {
	authData?: User
}
