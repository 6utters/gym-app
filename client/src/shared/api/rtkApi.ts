import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { API_URL } from './axiosApi'
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/consts'

const baseQuery = fetchBaseQuery({
	baseUrl: API_URL,
	prepareHeaders: headers => {
		const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)
		if (accessToken) {
			headers.set('authorization', `Bearer ${accessToken}`)
		}
		return headers
	}
})

export const $rtkApi = createApi({
	reducerPath: 'api',
	baseQuery,
	tagTypes: [
		'Exercise',
		'ProgramExercises',
		'MuscleGroup',
		'Program',
		'Statistics',
		'Objective'
	],
	endpoints: builder => ({})
})
