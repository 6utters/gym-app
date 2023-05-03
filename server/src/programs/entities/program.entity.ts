import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
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

	@Column({ name: 'image_path' })
	image_path: string

	@ManyToOne(() => User, user => user.programs)
	@JoinColumn({ name: 'user_id' })
	userId: number

	@ManyToMany(() => Exercise, exercise => exercise.programs, {
		onDelete: 'CASCADE',
	})
	@JoinTable({ name: 'programs_exercises' })
	exercises: Exercise[]

	@OneToMany(() => Statistics, statistics => statistics.program, {
		onDelete: 'CASCADE',
	})
	statistics: Statistics[]

	@OneToMany(() => Objective, objective => objective.program, {
		onDelete: 'CASCADE',
	})
	objectives: Objective[]
}
