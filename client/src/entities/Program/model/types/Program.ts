import { Exercise } from '@/entities/Exercise'
import { Objective } from '@/entities/Objective'
import { Statistics } from '@/entities/Statisctics'

export interface Program {
	id: number
	name: string
	image_path: string
	userId: number
	completedDate?: Date
	exercises: Exercise[]
	objectives?: Objective[]
	statistics?: Statistics[]
}
