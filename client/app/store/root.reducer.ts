import { combineReducers } from 'redux'
import { authSlice } from '@/store/auth/auth.slice'

export const rootReducer = combineReducers({
	auth: authSlice.reducer
})
