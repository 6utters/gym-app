import { Column, Entity, JoinColumn, OneToMany } from 'typeorm'
import { Base } from '../../utils/db/base'
import { Exercise } from '../../exercises/entities/exercise.entity'

@Entity('groups')
export class Group extends Base {
	@Column()
	name: string

	@Column({ name: 'thumbnail_path' })
	thumbnailPath: string

	@OneToMany(() => Exercise, exercise => exercise.group)
	@JoinColumn()
	exercises: Exercise[]
}
