import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Base } from '../../utils/db/base'
import { Group } from '../../groups/entities/group.entity'
import { Warning } from './warning.entity'
import { Instruction } from './instruction.entity'
import { Objective } from '../../objectives/entities/objective.entity'
import { Program } from '../../programs/entities/program.entity'

@Entity('exercises')
export class Exercise extends Base {
	@Column()
	name: string

	@Column({ name: 'thumbnail_path' })
	thumbnailPath: string

	@Column({ type: 'text' })
	description: string

	@OneToMany(() => Program, program => program.exercises)
	programs: Program[]

	@OneToMany(() => Instruction, instruction => instruction.exercise, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	instructions: Instruction[]

	@OneToMany(() => Warning, warning => warning.exercise, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	warnings: Warning[]

	@OneToMany(() => Objective, objective => objective.exerciseId)
	objectives: Objective[]

	@Column({ name: 'video_path' })
	videoPath: string

	@ManyToOne(() => Group, group => group.exercises)
	group: Group
}
