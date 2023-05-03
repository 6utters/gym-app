import React, { FC, ReactNode } from 'react'
import { PanelHeader } from '../panelHeader/PanelHeader'
import cn from 'classnames'

import styles from './Panel.module.scss'

interface PanelProps {
	className?: string
	onClose: () => void
	title?: string
	Icon: ReactNode
	onIconClick?: () => void
	children: ReactNode
}

export const Panel: FC<PanelProps> = props => {
	const { className, onClose, Icon, title, onIconClick, children } = props

	return (
		<div className={cn(styles.panel, className)}>
			<div className={styles.container}>
				<PanelHeader
					title={title}
					onClose={onClose}
					Icon={Icon}
					onIconClick={onIconClick}
				/>
				{children}
			</div>
		</div>
	)
}
