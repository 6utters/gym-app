import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createReduxStore, store } from '../config/store'
import { StateSchema } from '../config/StateSchema'

interface StoreProviderProps {
	children: ReactNode
	initialState?: DeepPartial<StateSchema>
}

export const StoreProvider: FC<StoreProviderProps> = props => {
	const { children, initialState } = props

	const backedUpStore = createReduxStore(initialState as StateSchema)

	return (
		<Provider store={initialState ? backedUpStore : store}>{children}</Provider>
	)
}
