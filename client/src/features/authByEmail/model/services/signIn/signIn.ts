import { AuthByEmailResponse } from '../../types/AuthByEmailSchema'
import { ThunkConfig } from '@/app/providers/storeProvider'
import { userActions } from '@/entities/User'
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/consts'
import { createAsyncThunk } from '@reduxjs/toolkit'

export interface SignInFields {
	email: string
	password: string
}

export const signIn = createAsyncThunk<
	AuthByEmailResponse,
	SignInFields,
	ThunkConfig<string>
>('authByEmail/signIn', async (inputData, thunkAPI) => {
	const { dispatch, extra, rejectWithValue } = thunkAPI
	try {
		const response = await extra.api.post<AuthByEmailResponse>(
			'/auth/login',
			inputData
		)

		if (!response.data) {
			throw new Error()
		}
		localStorage.setItem(
			ACCESS_TOKEN_LOCAL_STORAGE_KEY,
			response.data.accessToken
		)
		dispatch(userActions.setAuthData(response.data.user))

		return response.data
	} catch (e: any) {
		return rejectWithValue(e.response.data.message)
	}
})
