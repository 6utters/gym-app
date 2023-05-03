import { Objective } from '@/types/objective.interface'

export const getObjectiveById = (objectives: Objective[], id: number) =>
	objectives.find(obj => obj.exerciseId === id) || null
