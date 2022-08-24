import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthInitialState } from '@/store/auth/auth.interface'
import { checkAuth, login, logout, register } from '@/store/auth/auth.actions'
import { IAuthData } from '../../types/authData.interface'

const initialState: IAuthInitialState = {
	user: null,
	refreshToken: '',
	accessToken: '',
	isLoading: false,
	error: ''
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: {
		[register.pending.type]: state => {
			state.isLoading = true
		},
		[register.fulfilled.type]: (state, action: PayloadAction<IAuthData>) => {
			state.isLoading = false
			state.user = action.payload.user
			state.error = ''
			state.accessToken = action.payload.accessToken
		},
		[register.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.user = null
			state.error = action.payload
			state.accessToken = ''
		},
		[login.pending.type]: state => {
			state.isLoading = true
		},
		[login.fulfilled.type]: (state, action: PayloadAction<IAuthData>) => {
			state.isLoading = false
			state.user = action.payload.user
			state.error = ''
			state.accessToken = action.payload.accessToken
		},
		[login.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.user = null
			state.error = action.payload
			state.accessToken = ''
		},
		[logout.pending.type]: state => {
			state.isLoading = true
		},
		[logout.fulfilled.type]: (state, action: PayloadAction) => {
			state.isLoading = false
			state.user = null
			state.error = ''
			state.accessToken = ''
		},
		[logout.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		},
		[checkAuth.pending.type]: state => {
			state.isLoading = true
		},
		[checkAuth.fulfilled.type]: (state, action: PayloadAction<IAuthData>) => {
			state.isLoading = false
			state.user = action.payload.user
			state.error = ''
			state.accessToken = action.payload.accessToken
		},
		[checkAuth.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.user = null
			state.error = action.payload
			state.accessToken = ''
		}
	}
})
