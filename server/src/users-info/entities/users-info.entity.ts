import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { Base } from '../../utils/db/base'
import { User } from '../../users/entities/user.entity'

@Entity('users_info')
export class User_info extends Base {
	@Column()
	height: number

	@Column()
	weight: number

	@Column()
	age: number

	@Column({ type: 'enum', enum: ['male', 'female', 'default'] })
	gender: string

	@OneToOne(() => User, user => user.user_info, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	userId: User
}
