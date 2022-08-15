import { FC } from 'react'
import styles from './Authentication.module.scss'
import { useRouter } from 'next/router'
import Logo from '../../ui/logo/Logo'
import AuthForm from '@/pages/authentication/authForm/AuthForm'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'

const Authentication: FC = () => {
	useAuthRedirect()
	const { pathname } = useRouter()
	return (
		<section className={styles.wrapper}>
			<div className={styles.content}>
				<Logo length={80} />
				<AuthForm type={'login'} />
			</div>
		</section>
	)
}

export default Authentication
