import { IGroup } from '../../../types/group.interface'
import { $rtkApi } from '@/shared/api'

export const muscleGroupsApi = $rtkApi.injectEndpoints({
	endpoints: builder => ({
		getMuscleGroups: builder.query<IGroup[], any>({
			query: () => '/groups',
			providesTags: () => [{ type: 'MuscleGroup' }]
		})
	})
})
