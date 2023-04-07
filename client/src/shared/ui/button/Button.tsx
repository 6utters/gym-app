import styles from './Button.module.scss'
import cn from 'classnames'
import { ButtonHTMLAttributes, memo, ReactNode } from 'react'

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
}

export const Button = memo((props: ButtonProps) => {
	const {
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
				[styles[size]]: true
			})}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	)
})
