import { Objective } from '@/entities/Objective'

export const getObjectiveById = (objectives: Objective[], id: number) =>
	objectives.find(obj => obj.exercise.id === id) || null
