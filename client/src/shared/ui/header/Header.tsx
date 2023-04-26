import styles from './Header.module.scss'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Button, ButtonTheme } from '@/shared/ui'

interface HeaderProps {
	title: string
	backArrow?: boolean
	extraButton?: ReactNode
}

const Header: FC<HeaderProps> = props => {
	const { backArrow = false, title, extraButton } = props
	const router = useRouter()

	return (
		<header className={styles.header}>
			{backArrow && (
				<div className={styles.back_arrow}>
					<Button
						theme={ButtonTheme.CLEAR}
						className={styles.arrow_btn}
						onClick={router.back}
					>
						<IoIosArrowBack />
					</Button>
				</div>
			)}
			<h1 className={styles.title}>{title}</h1>
			{extraButton && <div className={styles.extra_button}>{extraButton}</div>}
		</header>
	)
}

export default Header
