import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { API_URL } from '../../../shared/api/axios'
import { TypedRootState } from '@/app/store/store'
import { IUser } from '../../../types/user.interface'

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Program', 'MuscleGroup', 'Exercise', 'User', 'ProgramExercises'],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as TypedRootState).auth.accessToken
			if (token) headers.set('Authorization', `Bearer ${token}`)
			return headers
		}
	}),
	endpoints: build => ({
		getUser: build.query<IUser, any>({
			query: () => `users/profile`,
			providesTags: () => [{ type: 'User' }]
		})
	})
})
