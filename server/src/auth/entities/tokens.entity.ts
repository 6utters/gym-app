import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { Base } from '../../utils/db/base'

@Entity('tokens')
export class Tokens extends Base {
	@OneToOne(() => User, user => user.id)
	@JoinColumn({ name: 'userId' })
	userId: User

	@Column({ length: 1000, name: 'refresh_token', nullable: false })
	refreshToken: string
}
