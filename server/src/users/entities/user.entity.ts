import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
} from 'typeorm'
import { Base } from '../../utils/db/base'
import { Role } from '../../roles/entities/role.entity'
import { User_info } from '../../users-info/entities/users-info.entity'
import { Objective } from '../../objectives/entities/objective.entity'
import { Program } from '../../programs/entities/program.entity'
import { Statistics } from '../../statistics/entities/statistic.entity'

@Entity('users')
export class User extends Base {
	@Column({ unique: true })
	email: string

	@Column({ select: false })
	password: string

	@Column({ unique: true })
	userName: string

	@OneToMany(() => Program, program => program.userId, { onDelete: 'CASCADE' })
	programs: Program[]

	@OneToOne(() => User_info, user_info => user_info.userId)
	user_info: User_info

	@ManyToOne(() => Statistics, statistics => statistics.user)
	statistics: Statistics[]

	@ManyToMany(() => Role, role => role.users)
	@JoinTable({ name: 'users_roles' })
	roles: Role[]

	@OneToMany(() => Objective, objective => objective.user)
	objectives: Objective[]
}
