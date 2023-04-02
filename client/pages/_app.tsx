import type { AppProps } from 'next/app'

import '../src/app/styles/globals.scss'
import { Provider } from 'react-redux'
import { store } from '@/app/store/store'
import AuthProvider from '@/app/providers/auth/Auth.provider'
import { TypeComponentAuthFields } from '../src/types/auth.types'

type TypeAuthProps = AppProps & TypeComponentAuthFields

function MyApp({ Component, pageProps }: TypeAuthProps) {
	return (
		<Provider store={store}>
			<AuthProvider Component={Component}>
				<Component {...pageProps} />
			</AuthProvider>
		</Provider>
	)
}

export default MyApp
