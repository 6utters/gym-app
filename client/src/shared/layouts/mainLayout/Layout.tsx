import { APP_NAME } from '@/shared/consts'
import { Header } from '@/widgets/header'
import Head from 'next/head'
import { FC, ReactNode } from 'react'
import { Navbar } from '@/widgets/navbar'
import styles from './Layout.module.scss'

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
				<link rel='icon' href='/favicon.ico' />
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
