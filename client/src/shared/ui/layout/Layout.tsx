import { FC, PropsWithChildren } from 'react'
import Header from '@/shared/ui/layout/header/Header'
import Navbar from '@/shared/ui/layout/navbar/Navbar'
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
