import { api } from '@/store/api/api'
import { IProgram } from '../../types/program.interface'

export const workoutsApi = api.injectEndpoints({
	endpoints: builder => ({
		getWorkouts: builder.query<IProgram[], void>({
			query: () => 'programs/from/user',
			providesTags: () => [{ type: 'Program' }]
		})
	})
})
