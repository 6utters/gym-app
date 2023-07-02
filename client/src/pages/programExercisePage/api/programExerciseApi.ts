import { $rtkApi } from '@/shared/api'
import { Objective } from '@/entities/Objective'
import { Statistics } from '@/entities/Statisctics'

interface getParams {
	exerciseId: number
	programId: number
}

const programExerciseApi = $rtkApi.injectEndpoints({
	endpoints: builder => ({
		getProgramExerciseIds: builder.query<number[], number>({
			query: programId => `exercises/by-program/${programId}`
		}),
		getObjectives: builder.query<Objective, getParams>({
			query: ({ exerciseId, programId }) =>
				`objectives/search?progId=${programId}&exerId=${exerciseId}`,
			providesTags: () => [{ type: 'Objective' }]
		}),
		getStatistics: builder.query<Statistics[], getParams>({
			query: ({ exerciseId, programId }) =>
				`statistics/search?progId=${programId}&exerId=${exerciseId}`,
			providesTags: () => [{ type: 'Statistics' }]
		})
	})
})

export const useGetObjectives = programExerciseApi.useGetObjectivesQuery
export const useGetStatistics = programExerciseApi.useGetStatisticsQuery
export const useGetProgramExerciseIds =
	programExerciseApi.useGetProgramExerciseIdsQuery
