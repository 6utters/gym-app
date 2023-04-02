import { FC } from 'react'
import styles from './Home.module.scss'
import Logo from '@/components/ui/logo/Logo'
import AppPeculiarities from '@/pages/home/appPeculiarities/AppPeculiarities'
import AuthHomeButtons from '@/pages/home/authHomeButtons/AuthHomeButtons'

const Home: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<Logo length={100} />
				<AppPeculiarities />
				<AuthHomeButtons />
			</div>
		</div>
	)
}

export default Home
