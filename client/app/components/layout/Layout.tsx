import { FC, PropsWithChildren } from 'react'
import Header from '@/components/layout/header/Header'
import Navbar from '@/components/layout/navbar/Navbar'
import styles from './Layout.module.scss'

const Layout: FC<PropsWithChildren<{ title: string }>> = ({
	children,
	title
}) => {
	return (
		<div className={styles.layout}>
			<Header title={title} />
			<div className={styles.layout__main}>{children}</div>
			<Navbar />
		</div>
	)
}

export default Layout
