import { createSlice } from '@reduxjs/toolkit'
import { AuthByEmailSchema } from '../types/AuthByEmailSchema'
import { logOut, refresh, signIn, signUp } from '../services'

const initialState: AuthByEmailSchema = {
	isLoading: false,
	error: undefined,
}

export const authByEmailSlice = createSlice({
	name: 'authByEmail',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(signUp.pending, state => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(signUp.fulfilled, state => {
				state.isLoading = false
			})
			.addCase(signUp.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
			.addCase(signIn.pending, state => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(signIn.fulfilled, state => {
				state.isLoading = false
			})
			.addCase(signIn.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
			.addCase(refresh.pending, state => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(refresh.fulfilled, state => {
				state.isLoading = false
			})
			.addCase(refresh.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
			.addCase(logOut.pending, state => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(logOut.fulfilled, state => {
				state.isLoading = false
			})
			.addCase(logOut.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	},
})

export const { reducer: authByEmailReducer, actions: authByEmailActions } =
	authByEmailSlice
