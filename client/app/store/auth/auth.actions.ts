import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthData } from '../../types/authData.interface'
import { ILoginFields, ISighUpFields } from '@/store/auth/auth.interface'
import { AuthService } from '@/services/auth/auth.service'
import { errorCatch } from '@/utils/api.utils'

export const register = createAsyncThunk<IAuthData, ISighUpFields>(
	'auth/register',
	async ({ email, password, userName }, thunkApi) => {
		try {
			return await AuthService.register(email, password, userName)
		} catch (e) {
			return thunkApi.rejectWithValue(errorCatch(e))
		}
	}
)

export const login = createAsyncThunk<IAuthData, ILoginFields>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			return await AuthService.login(email, password)
		} catch (e) {
			return thunkApi.rejectWithValue(errorCatch(e))
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
	try {
		return await AuthService.logout()
	} catch (e) {
		return thunkApi.rejectWithValue(errorCatch(e))
	}
})

export const checkAuth = createAsyncThunk<IAuthData>(
	'auth/check',
	async (_, thunkApi) => {
		try {
			return await AuthService.check()
		} catch (e) {
			return thunkApi.rejectWithValue(errorCatch(e))
		}
	}
)
