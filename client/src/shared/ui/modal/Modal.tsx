import { FC, memo, ReactNode } from 'react'
import { useModal } from '@/shared/lib/hooks'
import { Overlay } from '@/shared/ui'
import cn from 'classnames'
import dynamic from 'next/dynamic'
import styles from './Modal.module.scss'

const DynamicPortal = dynamic(() => import('../portal/Portal'), { ssr: false })

export enum ModalDirection {
	UP = 'up',
	DOWN = 'down',
	LEFT = 'left',
	RIGHT = 'right'
}

interface ModalProps {
	children: ReactNode
	isOpen: boolean
	onClose?: () => void
	lazy?: boolean
	direction?: ModalDirection
	className?: string
}

const ANIMATION_DELAY = 250

export const Modal: FC<ModalProps> = memo(
	({
		isOpen,
		onClose,
		children,
		lazy,
		className,
		direction = ModalDirection.UP
	}) => {
		const { close, isClosing, isMounted } = useModal({
			animationDelay: ANIMATION_DELAY,
			onClose,
			isOpen
		})

		if (lazy && !isMounted) {
			return null
		}

		return (
			<DynamicPortal>
				<div
					className={cn(styles.modal, className, {
						[styles.opened]: isOpen,
						[styles.isClosing]: isClosing
					})}
				>
					<Overlay onClick={close} />
					<div
						className={cn(styles.content, {
							[styles[ModalDirection.UP]]: direction === ModalDirection.UP,
							[styles[ModalDirection.DOWN]]: direction === ModalDirection.DOWN,
							[styles[ModalDirection.LEFT]]: direction === ModalDirection.LEFT,
							[styles[ModalDirection.RIGHT]]: direction === ModalDirection.RIGHT
						})}
					>
						{children}
					</div>
				</div>
			</DynamicPortal>
		)
	}
)
