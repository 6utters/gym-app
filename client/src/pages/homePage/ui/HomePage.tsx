import styles from './Home.module.scss'
import AppPeculiarities from '@/pages/home/appPeculiarities/AppPeculiarities'
import AuthHomeButtons from '@/pages/home/authHomeButtons/AuthHomeButtons'
import Logo, { LogoSize } from '@/shared/ui/logo/Logo'
import { FC } from 'react'

const Home: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<Logo size={LogoSize.L} />
				<AppPeculiarities />
				<AuthHomeButtons />
			</div>
		</div>
	)
}

export default Home
