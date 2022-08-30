import { api } from '@/store/api/api'
import { IProgram } from '../../types/program.interface'

export const workoutsApi = api.injectEndpoints({
	endpoints: builder => ({
		getWorkouts: builder.query<IProgram[], void>({
			query: () => 'programs/from/user',
			providesTags: () => [{ type: 'Program' }]
		}),
		createWorkout: builder.mutation<IProgram[], any>({
			query: body => ({
				url: 'programs/',
				method: 'POST',
				body
			}),
			invalidatesTags: () => [{ type: 'Program' }]
		})
	})
})
