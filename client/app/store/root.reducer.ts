import { combineReducers } from 'redux'
import { authSlice } from '@/store/auth/auth.slice'
import { api } from '@/store/api/api'
import { programSlice } from '@/store/program/program.slice'

export const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	auth: authSlice.reducer,
	program: programSlice.reducer
})
