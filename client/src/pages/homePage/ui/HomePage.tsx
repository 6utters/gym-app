import { FC } from 'react'

import Logo from '@/shared/ui/logo/Logo'
import { Button } from '@/shared/ui'
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '@/shared/consts'

import Link from 'next/link'
import styles from './HomePage.module.scss'

//todo: custom mini-carousel

export const HomePage: FC = () => {
	return (
		<main className={styles.container}>
			<div className={styles.content}>
				<Logo size='xl' />
				<div className={styles.peculiarities}>
					<h1>transform your body</h1>
					<p>Build muscle and burn fat. With or without equipment.</p>
				</div>
				<div className={styles.buttons}>
					<Button color='secondary' size='m' fullWidth>
						<Link href={SIGN_UP_ROUTE}>Sign Up</Link>
					</Button>
					<Button size='m' fullWidth>
						<Link href={SIGN_IN_ROUTE}>Sign In</Link>
					</Button>
				</div>
			</div>
		</main>
	)
}
