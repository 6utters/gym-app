import { $rtkApi } from '@/shared/api'

const programApi = $rtkApi.injectEndpoints({
	endpoints: builder => ({
		completeProgram: builder.mutation<void, number>({
			query: programId => ({
				method: 'POST',
				url: `programs/complete/${programId}`
			})
		})
	})
})

export const useCompleteProgram = programApi.useCompleteProgramMutation
export const completeProgram = programApi.endpoints.completeProgram.initiate
