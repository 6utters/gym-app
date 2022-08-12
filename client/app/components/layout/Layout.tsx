import { FC, PropsWithChildren } from 'react'
import Header from '@/components/layout/header/Header'
import Navbar from '@/components/layout/navbar/Navbar'
import styles from './Layout.module.scss'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Header />
			<div className={styles.layout__main}>{children}</div>
			<Navbar />
		</div>
	)
}

export default Layout
