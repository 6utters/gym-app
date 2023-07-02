import { Objective } from '@/entities/Objective'

export interface CreateWorkoutSchema {
	exerciseIds: number[]
	objectives: Objective[]
}
