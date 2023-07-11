import { StateSchema } from '@/app/providers/storeProvider'
import { getExerciseIds } from './getExerciseIds'

describe('getExerciseIds', () => {
	test('should return true', () => {
		const state: DeepPartial<StateSchema> = {
			createWorkout: {
				exerciseIds: [1, 2, 3, 4]
			}
		}
		expect(getExerciseIds(state as StateSchema)).toEqual([1, 2, 3, 4])
	})
	test('should return empty array if the state is empty', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getExerciseIds(state as StateSchema)).toEqual([])
	})
})
