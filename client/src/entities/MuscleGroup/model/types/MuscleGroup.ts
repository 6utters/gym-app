import { Exercise } from '@/entities/Exercise'

export interface MuscleGroup {
	id: number
	name: string
	thumbnailPath: string
	exercises: Exercise[]
}
