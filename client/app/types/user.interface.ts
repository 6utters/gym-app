import { IBase } from './base.interface'
import { IRole } from './role.interface'
import { IProgram } from './program.interface'
import { IUserInfo } from './userInfo.interface'

export interface IUser extends IBase {
	email: string
	userName: string
	user_info: IUserInfo
	programs: IProgram[]
	roles: IRole[]
}
