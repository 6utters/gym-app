import { api } from '@/store/api/api'
import { IExercise } from '../../types/exercise.interface'

export const exercisesApi = api.injectEndpoints({
	endpoints: builder => ({
		getExercisesByMuscleGroup: builder.query<IExercise[], number>({
			query: groupId => `/exercises/${groupId}`,
			providesTags: () => [{ type: 'Exercise' }]
		}),
		getExerciseById: builder.query<IExercise, number>({
			query: exerciseId => `/exercises/ex/${exerciseId}`
		})
	})
})
