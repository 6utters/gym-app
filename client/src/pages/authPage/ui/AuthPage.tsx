import { FC, memo } from 'react'
import { AuthForm } from '@/features/authByEmail'
import styles from './AuthPage.module.scss'

export const AuthPage: FC = memo(() => {
	return (
		<main className={styles.container}>
			<AuthForm />
		</main>
	)
})
