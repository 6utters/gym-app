import { $rtkApi } from '@/shared/api'
import { Exercise } from '@/entities/Exercise'

const exerciseApi = $rtkApi.injectEndpoints({
	endpoints: builder => ({
		getExercisesByMuscleGroup: builder.query<Exercise[], number>({
			query: groupId => `/exercises/gr/${groupId}`,
			providesTags: () => [{ type: 'Exercise' }]
		}),
		getExerciseById: builder.query<Exercise, number>({
			query: exerciseId => `/exercises/${exerciseId}`
		}),
		getAll: builder.query<Exercise[], number[]>({
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

export const useGetExercisesByMG = exerciseApi.useGetExercisesByMuscleGroupQuery
export const useGetExerciseById = exerciseApi.useGetExerciseByIdQuery
export const useGetExercises = exerciseApi.useGetAllQuery
