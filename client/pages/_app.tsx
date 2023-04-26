import type { AppProps } from 'next/app'
import { AuthProvider, ComponentAuthFields } from '@/app/providers/authProvider'
import { StoreProvider } from '@/app/providers/storeProvider'

import '../src/app/styles/globals.scss'

type TypeAuthProps = AppProps & ComponentAuthFields

function MyApp({ Component, pageProps }: TypeAuthProps) {
	return (
		<StoreProvider>
			<AuthProvider Component={Component}>
				<main id={'mainApp'}>
					<Component {...pageProps} />
				</main>
			</AuthProvider>
		</StoreProvider>
	)
}

export default MyApp
