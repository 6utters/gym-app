import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from '../../utils/db/base'
import { Exercise } from './exercise.entity'

@Entity('instructions')
export class Instruction extends Base {
	@Column({ type: 'text' })
	instruction: string

	@ManyToOne(() => Exercise, exercise => exercise.instructions, {
		onDelete: 'CASCADE',
	})
	exercise: Exercise
}
