import { FC } from 'react'
import styles from './AuthHomeButtons.module.scss'
import Button from '@/shared/ui/button/Button'
import { useRouter } from 'next/router'

const AuthHomeButtons: FC = () => {
	const router = useRouter()
	return (
		<div className={styles.container}>
			<Button onClick={() => router.push('/auth/register')}>Sign Up</Button>
			<Button onClick={() => router.push('/auth/login')}>Sign In</Button>
		</div>
	)
}

export default AuthHomeButtons
