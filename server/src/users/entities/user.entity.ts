import { Column, Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm'
import { Base } from '../../utils/db/base'
import { Role } from '../../roles/entities/role.entity'
import { User_info } from '../../users-info/entities/users-info.entity'

@Entity('users')
export class User extends Base {
	@Column({ unique: true })
	email: string

	@Column({ select: false })
	password: string

	@Column({ unique: true })
	userName: string

	@OneToOne(() => User_info, user_info => user_info.userId)
	user_info: User_info

	@ManyToMany(() => Role, role => role.users)
	@JoinTable({ name: 'users_roles' })
	roles: Role[]
}
