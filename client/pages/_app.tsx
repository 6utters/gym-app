import type { AppProps } from 'next/app'

import '../styles/globals.scss'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import AuthProvider from '@/providers/auth/Auth.provider'
import { TypeComponentAuthFields } from '../app/types/auth.types'

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
