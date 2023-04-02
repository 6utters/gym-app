import { api } from './api'
import { IGroup } from '../../../types/group.interface'

export const muscleGroupsApi = api.injectEndpoints({
	endpoints: builder => ({
		getMuscleGroups: builder.query<IGroup[], any>({
			query: () => '/groups',
			providesTags: () => [{ type: 'MuscleGroup' }]
		})
	})
})
