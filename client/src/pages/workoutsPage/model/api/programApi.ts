import { $rtkApi } from '@/shared/api'
import { Program } from '@/entities/Program/model/types/Program'

const programApi = $rtkApi.injectEndpoints({
	endpoints: builder => ({
		getPrograms: builder.query<Program[], void>({
			query: () => 'programs/from/user',
			providesTags: () => [{ type: 'Program' }]
		}),
		deleteProgram: builder.mutation<void, number>({
			query: id => ({
				url: `programs/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: () => [{ type: 'Program' }]
		})
	})
})

export const useGetPrograms = programApi.useGetProgramsQuery
export const useDeleteProgram = programApi.useDeleteProgramMutation
