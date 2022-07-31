import { Column, Entity, ManyToMany } from 'typeorm'
import { Base } from '../../utils/db/base'
import { User } from '../../users/entities/user.entity'

@Entity('Role')
export class Role extends Base {
	@Column({ unique: true, nullable: false })
	value: string

	@Column({ nullable: false })
	description: string

	@ManyToMany(() => User, user => user.roles)
	users: User[]
}
