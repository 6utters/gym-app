import { Objective } from '@/types/objective.interface'

export interface CreateWorkoutSchema {
	exerciseIds: number[]
	objectives: Objective[]
}
