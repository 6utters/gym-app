import { Program } from '@/entities/Program'
import { Exercise } from '@/entities/Exercise'

export interface Statistics {
	id: number
	program: Program
	repetitions: number
	exercise: Exercise
	createdAt: string
}

export type DayProgress = Record<string, Array<[number, string]>>

export interface StatisticsSchema {
	dayProgress: DayProgress
}
