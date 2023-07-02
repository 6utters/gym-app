import { Exercise } from '@/entities/Exercise'

export interface Objective {
	targetSets: number
	targetReps: number
	timeout: number
	exercise: Partial<Exercise>
}
