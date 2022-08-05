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
import { Objective } from '../../objectives/entities/objective.entity'
import { Statistics } from '../../statistics/entities/statistic.entity'

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

	@ManyToOne(() => Statistics, statistics => statistics.program)
	statistics: Statistics[]

	@ManyToOne(() => Objective, objective => objective.program)
	objectives: Objective[]
}
