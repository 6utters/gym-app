import { $rtkApi } from '@/shared/api'
import { MuscleGroup } from '../types/MuscleGroup'

const muscleGroupApi = $rtkApi.injectEndpoints({
	endpoints: builder => ({
		getMuscleGroups: builder.query<MuscleGroup[], void>({
			query: () => '/groups',
			providesTags: () => [{ type: 'MuscleGroup' }]
		})
	})
})

export const useGetMuscleGroups = muscleGroupApi.useGetMuscleGroupsQuery
