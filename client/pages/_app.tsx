import type { AppProps } from 'next/app'
import { AuthProvider, ComponentAuthFields } from '@/app/providers/authProvider'
import { StoreProvider } from '@/app/providers/storeProvider'

import '../src/app/styles/index.scss'
import { ErrorBoundary } from '@/app/providers/errorBoundary'

type TypeAuthProps = AppProps & ComponentAuthFields

function MyApp({ Component, pageProps }: TypeAuthProps) {
	return (
		<ErrorBoundary>
			<StoreProvider>
				<AuthProvider Component={Component}>
					<main id={'mainApp'} className={'light'}>
						<Component {...pageProps} />
					</main>
				</AuthProvider>
			</StoreProvider>
		</ErrorBoundary>
	)
}

export default MyApp
