import { StateSchema } from '@/app/providers/storeProvider'
import { getObjectives } from './getObjectives'
import { Objective } from '@/entities/Objective'

const objectives: DeepPartial<Objective>[] = [
	{
		targetSets: 5,
		targetReps: 3,
		timeout: 1500,
		exercise: {
			id: 1
		}
	},
	{
		targetSets: 6,
		targetReps: 4,
		timeout: 1500,
		exercise: {
			id: 2
		}
	},
	{
		targetSets: 3,
		targetReps: 2,
		timeout: 1500,
		exercise: {
			id: 3
		}
	},
	{
		targetSets: 1,
		targetReps: 2,
		timeout: 1500,
		exercise: {
			id: 4
		}
	}
]

describe('getObjectives', () => {
	test('should return true', () => {
		const state: DeepPartial<StateSchema> = {
			createWorkout: {
				objectives
			}
		}
		expect(getObjectives(state as StateSchema)).toEqual(objectives)
	})
	test('should return empty array if the state is empty', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getObjectives(state as StateSchema)).toEqual([])
	})
})
