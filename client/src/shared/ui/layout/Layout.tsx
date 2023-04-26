import styles from './Layout.module.scss'
import { APP_NAME } from '@/shared/consts'
import Header from '@/shared/ui/header/Header'
import Head from 'next/head'
import { FC, ReactNode } from 'react'
import { Navbar } from '@/widgets/navbar'

interface LayoutProps {
	title: string
	children: ReactNode
	withReturn?: boolean
	extraButton?: ReactNode
}

export const Layout: FC<LayoutProps> = props => {
	const { children, title, withReturn = false, extraButton } = props

	return (
		<>
			<Head>
				<title>{`${APP_NAME} | ${title}`}</title>
			</Head>
			<div className={styles.layout}>
				<Header
					title={title}
					backArrow={withReturn}
					extraButton={extraButton}
				/>
				<div className={styles.layout__main}>{children}</div>
				<Navbar />
			</div>
		</>
	)
}
