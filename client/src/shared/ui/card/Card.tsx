import { FC, ReactNode } from 'react'
import styles from './Card.module.scss'
import cn from 'classnames'

interface CardProps {
	children: ReactNode
	size: CardSize
	className?: string
	outlined?: boolean
	fullWith?: boolean
}

export enum CardSize {
	S = 'small',
	M = 'medium',
	L = 'large',
	XL = 'extra_large'
}

export const Card: FC<CardProps> = props => {
	const {
		children,
		className,
		size = CardSize.M,
		fullWith = true,
		outlined = false
	} = props
	return (
		<div
			className={cn(styles.card, className, {
				[styles[size]]: size,
				[styles.outlined]: outlined,
				[styles.full_with]: fullWith
			})}
		>
			{children}
		</div>
	)
}
