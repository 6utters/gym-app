import type { AppProps } from 'next/app'

import '../src/app/styles/globals.scss'
import AuthProvider from '@/app/providers/auth/Auth.provider'
import { TypeComponentAuthFields } from '@/types/auth.types'
import { StoreProvider } from '@/app/providers/storeProvider/ui/StoreProvider'

type TypeAuthProps = AppProps & TypeComponentAuthFields

function MyApp({ Component, pageProps }: TypeAuthProps) {
	return (
		<StoreProvider>
			<AuthProvider Component={Component}>
				<Component {...pageProps} />
			</AuthProvider>
		</StoreProvider>
	)
}

export default MyApp
