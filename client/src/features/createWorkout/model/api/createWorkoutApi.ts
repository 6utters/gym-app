import { $rtkApi } from '@/shared/api'
import { Program } from '@/entities/Program'

const workoutsApi = $rtkApi.injectEndpoints({
	endpoints: builder => ({
		createWorkout: builder.mutation<Program[], FormData>({
			query: body => ({
				url: 'programs/',
				method: 'POST',
				body
			}),
			invalidatesTags: () => [{ type: 'ProgramExercises' }, { type: 'Program' }]
		})
	})
})

export const useCreateWorkout = workoutsApi.useCreateWorkoutMutation
