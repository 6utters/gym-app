import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Base } from '../../utils/db/base'
import { User } from '../../users/entities/user.entity'
import { Exercise } from '../../exercises/entities/exercise.entity'
import { Program } from '../../programs/entities/program.entity'

@Entity('objectives')
export class Objective extends Base {
	@Column({ name: 'target_sets' })
	targetSets: number

	@Column({ name: 'target_reps' })
	targetReps: number

	@Column()
	timeout: number

	@ManyToOne(() => User, user => user.objectives)
	@JoinColumn({ name: 'user_id' })
	user: User

	@ManyToOne(() => Exercise, exercise => exercise.objectives)
	@JoinColumn({ name: 'exercise_id' })
	exercise: Exercise

	@ManyToOne(() => Program, program => program.objectives, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'program_id', referencedColumnName: 'id' })
	program: Program
}
