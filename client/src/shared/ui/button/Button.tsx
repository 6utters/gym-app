import { ButtonHTMLAttributes, memo, ReactNode } from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'

export type ButtonTheme = 'neutral' | 'clear' | 'outlined' | 'circle'
export type ButtonSize = 's' | 'm' | 'l'
export type ButtonColor = 'success' | 'invalid' | 'primary' | 'secondary'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
	size?: ButtonSize
	color?: ButtonColor
	disabled?: boolean
	fullWidth?: boolean
	theme?: ButtonTheme
	children: ReactNode
}

export const Button = memo((props: ButtonProps) => {
	const {
		theme = 'neutral',
		size = 'm',
		color = 'primary',
		className,
		disabled,
		fullWidth,
		children,
		...otherProps
	} = props
	return (
		<button
			className={cn(
				styles.button,
				className,
				styles[theme],
				styles[size],
				styles[color],
				{
					[styles.disabled]: disabled,
					[styles.full_width]: fullWidth
				}
			)}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	)
})
