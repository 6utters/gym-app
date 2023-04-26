import { FC, ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './Transition.module.scss'

interface TransitionProps {
	children: ReactNode
	isOpen: boolean
	unmountOnExit?: boolean
	direction?: TransitionDirection
	timeout?: number
	classNameObject?: Record<string, string>
}

export enum TransitionDirection {
	UP = 'up',
	LEFT = 'left',
	RIGHT = 'right',
	DOWN = 'down'
}

export const Transition: FC<TransitionProps> = props => {
	const {
		children,
		unmountOnExit = true,
		isOpen,
		direction = TransitionDirection.UP,
		timeout = 300,
		classNameObject
	} = props

	const createClassnames = (direction: TransitionDirection) => ({
		enter: styles[`transition_enter_${direction}`],
		enterActive: styles[`transition_enter_active_${direction}`],
		exit: styles[`transition_exit_${direction}`],
		exitActive: styles[`transition_exit_active_${direction}`]
	})

	return (
		<CSSTransition
			in={isOpen}
			timeout={timeout}
			classNames={
				classNameObject ? classNameObject : createClassnames(direction)
			}
			unmountOnExit={unmountOnExit}
		>
			{children}
		</CSSTransition>
	)
}
