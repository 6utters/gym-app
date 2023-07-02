import { $rtkApi } from '@/shared/api'
import { Statistics } from '@/entities/Statisctics'

interface AddProgressParams {
	programId: number
	exerciseId: number
	repetitions: number
}

const addProgressApi = $rtkApi.injectEndpoints({
	endpoints: builder => ({
		addProgress: builder.mutation<void, AddProgressParams>({
			query: body => ({
				url: 'statistics/',
				method: 'POST',
				body
			}),
			invalidatesTags: () => [{ type: 'Statistics' }]
		})
	})
})

export const useAddProgress = addProgressApi.useAddProgressMutation
export const addProgress = addProgressApi.endpoints.addProgress.initiate
