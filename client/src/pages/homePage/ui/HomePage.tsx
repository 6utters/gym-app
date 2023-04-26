import { FC } from 'react'
import { useRouter } from 'next/router'

import Logo, { LogoSize } from '@/shared/ui/logo/Logo'
import { Button } from '@/shared/ui'
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '@/shared/consts'

import styles from './HomePage.module.scss'

//todo: custom mini-carousel

export const HomePage: FC = () => {
	const router = useRouter()

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<Logo size={LogoSize.L} />
				<div className={styles.peculiarities}>
					<h1>transform your body</h1>
					<p>Build muscle and burn fat. With or without equipment.</p>
				</div>
				<div className={styles.buttons}>
					<Button onClick={() => router.push(SIGN_UP_ROUTE)}>Sign Up</Button>
					<Button onClick={() => router.push(SIGN_IN_ROUTE)}>Sign In</Button>
				</div>
			</div>
		</div>
	)
}
