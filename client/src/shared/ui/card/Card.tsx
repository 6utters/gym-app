import { FC, ReactNode } from 'react'
import styles from './Card.module.scss'
import cn from 'classnames'

interface CardProps {
	children: ReactNode
	size: CardSize
	className?: string
}

export enum CardSize {
	S = 'small',
	M = 'medium',
	L = 'large',
	XL = 'extra_large'
}

export const Card: FC<CardProps> = ({ children, className, size }) => {
	return (
		<div
			className={cn(styles.card, className, {
				[styles[size]]: size
			})}
		>
			{children}
		</div>
	)
}
