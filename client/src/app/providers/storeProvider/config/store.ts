import { StateSchema, ThunkExtraArg } from './StateSchema'
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { $api, $rtkApi } from '@/shared/api'
import { userReducer } from '@/entities/User'
import { authByEmailReducer } from '@/features/authByEmail'
import { createWorkoutReducer } from '@/features/createWorkout'
import { statisticsReducer } from '@/entities/Statisctics'
import { programCreationReducer } from '@/pages/programCreationPage'
import { programDetailsReducer } from '@/pages/programDetailsPage'

export function createReduxStore(initialState?: StateSchema) {
	const rootReducer: ReducersMapObject<StateSchema> = {
		[$rtkApi.reducerPath]: $rtkApi.reducer,
		user: userReducer,
		statistics: statisticsReducer,
		authByEmail: authByEmailReducer,
		createWorkout: createWorkoutReducer,
		programCreationPage: programCreationReducer,
		programDetailsPage: programDetailsReducer
	}

	const extraArgument: ThunkExtraArg = {
		api: $api
	}

	return configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: false,
				thunk: { extraArgument }
			}).concat($rtkApi.middleware)
	})
}

export const store = createReduxStore()

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
