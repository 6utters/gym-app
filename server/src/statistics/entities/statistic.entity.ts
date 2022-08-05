import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Base } from '../../utils/db/base'
import { User } from '../../users/entities/user.entity'
import { Program } from '../../programs/entities/program.entity'
import { Exercise } from '../../exercises/entities/exercise.entity'

@Entity('statistics')
export class Statistics extends Base {
	@Column()
	repetitions: number

	@ManyToOne(() => User, user => user.statistics)
	@JoinColumn({ name: 'user_id' })
	user: User

	@ManyToOne(() => Program, program => program.statistics)
	@JoinColumn({ name: 'program_id' })
	program: Program

	@ManyToOne(() => Exercise, exercise => exercise.statistics)
	@JoinColumn({ name: 'exercise_id' })
	exercise: Exercise
}
