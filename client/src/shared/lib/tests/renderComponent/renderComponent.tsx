import { ReactNode } from 'react'
import { StateSchema, StoreProvider } from '@/app/providers/storeProvider'
import { render } from '@testing-library/react'

export interface renderOptions {
	initialState?: DeepPartial<StateSchema>
}

interface TestProviderProps {
	children: ReactNode
	options?: renderOptions
}

export function TestProvider(props: TestProviderProps) {
	const { options = {}, children } = props
	const { initialState } = options
	return <StoreProvider initialState={initialState}>{children}</StoreProvider>
}

export function renderComponent(
	Component: ReactNode,
	options: renderOptions = {}
) {
	return render(<TestProvider options={options}>{Component}</TestProvider>)
}
