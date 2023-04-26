import styles from './Button.module.scss'
import cn from 'classnames'
import { ButtonHTMLAttributes, memo, ReactNode } from 'react'

export enum ButtonTheme {
	CLEAR = 'clear',
	CLEAR_INVERTED = 'clear_inverted'
}

export enum ButtonSize {
	'M' = 'size_m',
	'L' = 'size_l',
	'XL' = 'size_xl'
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
	children: ReactNode
	size?: ButtonSize
	disabled?: boolean
	theme?: ButtonTheme
}

export const Button = memo((props: ButtonProps) => {
	const {
		theme = ButtonTheme.CLEAR,
		className,
		disabled,
		children,
		size = ButtonSize.M,
		...otherProps
	} = props
	return (
		<button
			type='button'
			className={cn(styles.button, className, {
				[styles[size]]: true,
				[styles[theme]]: true
			})}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	)
})
