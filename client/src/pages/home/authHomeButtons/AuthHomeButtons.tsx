import styles from './AuthHomeButtons.module.scss'
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '@/shared/consts'
import { Button } from '@/shared/ui'
import { useRouter } from 'next/router'
import { FC } from 'react'

const AuthHomeButtons: FC = () => {
	const router = useRouter()
	return (
		<div className={styles.container}>
			<Button onClick={() => router.push(SIGN_UP_ROUTE)}>Sign Up</Button>
			<Button onClick={() => router.push(SIGN_IN_ROUTE)}>Sign In</Button>
		</div>
	)
}

export default AuthHomeButtons
