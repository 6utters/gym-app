import { FC, memo, ReactNode } from 'react'
import { useModal } from '@/shared/lib/hooks'
import { Overlay } from '@/shared/ui'
import cn from 'classnames'
import dynamic from 'next/dynamic'
import styles from './Modal.module.scss'

const DynamicPortal = dynamic(() => import('../portal/Portal'), { ssr: false })

interface ModalProps {
	children: ReactNode
	isOpen: boolean
	onClose?: () => void
	lazy?: boolean
}

const ANIMATION_DELAY = 250

export const Modal: FC<ModalProps> = memo(
	({ isOpen, onClose, children, lazy }) => {
		const { close, isClosing, isMounted } = useModal({
			animationDelay: ANIMATION_DELAY,
			onClose,
			isOpen,
		})

		if (lazy && !isMounted) {
			return null
		}

		return (
			<DynamicPortal>
				<div
					className={cn(styles.modal, {
						[styles.opened]: isOpen,
						[styles.isClosing]: isClosing,
					})}
				>
					<Overlay onClick={close} />
					<div className={styles.content}>{children}</div>
				</div>
			</DynamicPortal>
		)
	},
)
