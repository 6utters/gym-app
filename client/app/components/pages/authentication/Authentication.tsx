import { FC } from 'react'
import styles from './Authentication.module.scss'
import { useRouter } from 'next/router'

const Authentication: FC = () => {
	const { pathname } = useRouter()
	return <div className={styles.container}>Auth</div>
}

export default Authentication
