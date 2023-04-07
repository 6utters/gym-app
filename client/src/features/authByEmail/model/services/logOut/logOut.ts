import { ThunkConfig } from '@/app/providers/storeProvider'
import { userActions } from '@/entities/User'
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/consts'
import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const logOut = createAsyncThunk<void, void, ThunkConfig<string>>(
	'authByEmail/logOut',
	async (_, thunkAPI) => {
		const { rejectWithValue, dispatch, extra } = thunkAPI
		try {
			const response = await extra.api.post('/auth/logout')
			if (!response.data) {
				throw new Error()
			}
			Cookies.remove(ACCESS_TOKEN_LOCAL_STORAGE_KEY)
			dispatch(userActions.removeAuthData())

			return response.data
		} catch (e: any) {
			rejectWithValue(e.response.data.message)
		}
	}
)
