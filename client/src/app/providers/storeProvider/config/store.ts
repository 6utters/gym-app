import { StateSchema, ThunkExtraArg } from './StateSchema'
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { $api, $rtkApi } from '@/shared/api'

function createReduxStore(initialState?: StateSchema) {
	const rootReducer: ReducersMapObject<StateSchema> = {
		[$rtkApi.reducerPath]: $rtkApi.reducer,
	}

	const extraArgument: ThunkExtraArg = {
		api: $api
	}

	return configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
		middleware: getDefaultMiddleware => getDefaultMiddleware({
			serializableCheck: false,
			thunk: {extraArgument}
		}).concat($rtkApi.middleware)
	})
}

export const store = createReduxStore()

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']