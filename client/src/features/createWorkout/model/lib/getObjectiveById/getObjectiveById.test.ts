import { getObjectiveById } from './getObjectiveById'
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

describe('getObjectiveById.test', () => {
	test('should return correct objectives', () => {
		expect(getObjectiveById(objectives as Objective[], 2)).toEqual({
			targetSets: 6,
			targetReps: 4,
			timeout: 1500,
			exercise: {
				id: 2
			}
		})
	})
	test('should return null if it doesnt match any', () => {
		expect(getObjectiveById(objectives as Objective[], 5)).toEqual(null)
	})
})
