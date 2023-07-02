// import { FC } from 'react'
// import cn from 'classnames'
//
// import styles from './Overlay.module.scss'
//
// interface OverlayProps {
// 	className?: string
// 	onClick?: () => void
// }
//
// export const Overlay: FC<OverlayProps> = ({onClick, className}) => (
// 	<div onClick={onClick} className={cn(styles.overlay, className)}/>
// )

import { FC } from 'react'
import { Transition } from '@/shared/ui'
import styles from './Overlay.module.scss'

interface OverlayProps {
	isOpen?: boolean
	onClose: () => void
}

export const Overlay: FC<OverlayProps> = props => {
	const { isOpen, onClose } = props

	const classNameObject = {
		enter: styles.overlay_enter,
		enterActive: styles.overlay_enter_active,
		enterDone: styles.overlay_enter_done,
		exit: styles.overlay_exit,
		exitActive: styles.overlay_exit_active,
		exitDone: styles.overlay_exit_done
	}

	return (
		<Transition isOpen={isOpen || false} classNameObject={classNameObject}>
			<div className={styles.overlay} onClick={onClose} />
		</Transition>
	)
}
