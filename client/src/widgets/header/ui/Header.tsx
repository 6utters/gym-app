import { useRouter } from 'next/router'
import { FC, memo, ReactNode } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Button } from '@/shared/ui'
import styles from './Header.module.scss'

interface HeaderProps {
	title: string
	backArrow?: boolean
	extraButton?: ReactNode
}

export const Header: FC<HeaderProps> = memo(props => {
	const { backArrow = false, title, extraButton } = props
	const router = useRouter()

	return (
		<header className={styles.header}>
			{backArrow && (
				<div className={styles.back_arrow}>
					<Button
						theme='clear'
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
})
