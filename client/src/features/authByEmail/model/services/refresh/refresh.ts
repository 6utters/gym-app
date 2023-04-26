import { AuthByEmailResponse } from '../../types/AuthByEmailSchema'
import { ThunkConfig } from '@/app/providers/storeProvider'
import { userActions } from '@/entities/User'
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/consts'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const refresh = createAsyncThunk<
	AuthByEmailResponse,
	void,
	ThunkConfig<string>
>('authByEmail/check', async (_, ThunkAPI) => {
	const { rejectWithValue, extra, dispatch } = ThunkAPI
	try {
		const response = await extra.api.get<AuthByEmailResponse>('/auth/refresh', {
			withCredentials: true
		})
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
