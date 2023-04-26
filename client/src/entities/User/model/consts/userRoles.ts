export enum RoleTypes {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export interface UserRole {
	value: RoleTypes
	description: string
}
