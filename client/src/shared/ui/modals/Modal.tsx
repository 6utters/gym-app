import { FC, ReactNode } from 'react'
import Portal from '@/shared/ui/portal/Portal'
import cn from 'classnames'
import { Overlay } from '@/shared/ui'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import styles from './Modal.module.scss'

interface ModalProps {
	className?: string
	children?: ReactNode
	isOpen?: boolean
	onClose?: () => void
	lazy?: boolean
}

const ANIMATION_DELAY = 300

export const Modal: FC<ModalProps> = props => {
	const { className, children, onClose, isOpen, lazy } = props

	const { close, isClosing, isMounted } = useModal({
		animationDelay: ANIMATION_DELAY,
		onClose,
		isOpen
	})

	return (
		<Portal element={document.getElementById('__next') ?? document.body}>
			<div
				className={cn(styles.modal, className, {
					[styles.opened]: isOpen,
					[styles.isClosing]: isClosing
				})}
			>
				<Overlay isOpen={isOpen} onClose={close} />
				<div className={styles.content}>{children}</div>
			</div>
		</Portal>
	)
}
