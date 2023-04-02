import { api } from '@/app/store/api/api'
import { IExercise } from '../../../types/exercise.interface'

export const exercisesApi = api.injectEndpoints({
	endpoints: builder => ({
		getExercisesByMuscleGroup: builder.query<IExercise[], number>({
			query: groupId => `/exercises/${groupId}`,
			providesTags: () => [{ type: 'Exercise' }]
		}),
		getExerciseById: builder.query<IExercise, number>({
			query: exerciseId => `/exercises/ex/${exerciseId}`
		}),
		getAll: builder.query<IExercise[], number[]>({
			query: ids => {
				const query = ids.map(id => `ids=${id}&`).join('')
				return {
					url: `/exercises?${query}`
				}
			},
			providesTags: () => [{ type: 'ProgramExercises' }]
		})
	})
})
