import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { Base } from '../../utils/db/base'
import { Role } from '../../roles/entities/role.entity'

@Entity('User')
export class User extends Base {
	@Column({ unique: true })
	email: string

	@Column({ select: false })
	password: string

	@Column({ unique: true })
	userName: string

	@ManyToMany(() => Role, role => role.users)
	@JoinTable()
	roles: Role[]
}
