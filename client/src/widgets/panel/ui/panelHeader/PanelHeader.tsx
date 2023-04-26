import { FC, ReactNode } from 'react'
import { Button, ButtonTheme } from '@/shared/ui'
import { IoArrowBackOutline } from 'react-icons/io5'
import styles from './PanelHeader.module.scss'

interface PanelHeaderProps {
	title: string
	onClose: () => void
	Icon: ReactNode
	onIconClick?: () => void
}

export const PanelHeader: FC<PanelHeaderProps> = props => {
	const { onClose, title, Icon, onIconClick } = props

	return (
		<div className={styles.header}>
			<Button
				theme={ButtonTheme.CLEAR}
				className={styles.header_btn}
				onClick={onClose}
			>
				<IoArrowBackOutline />
			</Button>
			<div className={styles.title}>
				<h2>{title}</h2>
			</div>
			<Button
				theme={ButtonTheme.CLEAR}
				className={styles.header_btn}
				onClick={onIconClick}
			>
				{Icon}
			</Button>
		</div>
	)
}
