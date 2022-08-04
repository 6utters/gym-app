import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
} from 'typeorm'
import { Base } from '../../utils/db/base'
import { Exercise } from '../../exercises/entities/exercise.entity'
import { User } from '../../users/entities/user.entity'

@Entity('programs')
export class Program extends Base {
	@Column()
	name: string

	@ManyToOne(() => User, user => user.programs)
	@JoinColumn({ name: 'user_id' })
	userId: number

	@ManyToMany(() => Exercise, exercise => exercise.programs)
	@JoinTable({ name: 'programs_exercises' })
	exercises: Exercise[]
}
