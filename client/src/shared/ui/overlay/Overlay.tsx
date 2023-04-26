import { FC } from 'react'
import cn from 'classnames'

import styles from './Overlay.module.scss'

interface OverlayProps {
	className?: string
	onClick?: () => void
}

export const Overlay: FC<OverlayProps> = ({onClick, className}) => (
	<div onClick={onClick} className={cn(styles.overlay, className)}/>
)
