import { Exercise } from '@/entities/Exercise'

export interface Program {
	id: number
	name: string
	image_path: string
	userId: number
	exercises: Exercise[]
}
