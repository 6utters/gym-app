import styles from './AuthPage.module.scss'
import { AuthForm } from '@/features/authByEmail'
import { SIGN_UP_ROUTE } from '@/shared/consts'
import { useRouter } from 'next/router'
import { FC } from 'react'

export const AuthPage: FC = () => {
	const router = useRouter()
	const page = router.pathname === SIGN_UP_ROUTE ? 'sign_up' : 'sign_in'

	return (
		<div className={styles.container}>
			<AuthForm page={page} />
		</div>
	)
}
