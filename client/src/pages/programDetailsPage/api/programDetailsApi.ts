import { $rtkApi } from '@/shared/api'
import { Program } from '@/entities/Program/model/types/Program'

const programDetailsApi = $rtkApi.injectEndpoints({
	endpoints: builder => ({
		getProgramById: builder.query<Program, number>({
			query: id => `programs/${id}`
		})
	}),
	overrideExisting: true
})

export const useGetProgramById = programDetailsApi.useGetProgramByIdQuery
