import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from '../../utils/db/base'
import { Exercise } from './exercise.entity'

@Entity('warnings')
export class Warning extends Base {
	@Column({ type: 'text' })
	warning: string

	@ManyToOne(() => Exercise, exercise => exercise.warnings, {
		onDelete: 'CASCADE',
	})
	exercise: Exercise
}
