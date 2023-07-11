import cn from 'classnames'
import { forwardRef, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import styles from './Input.module.scss'

export interface InputProps {
	error?: FieldError
	className?: string
	underlined?: boolean
	fullWidth?: boolean
}

export type InputPropsField = InputHTMLAttributes<HTMLInputElement> & InputProps

export const Input = forwardRef<HTMLInputElement, InputPropsField>(
	(
		{
			className,
			error,
			underlined = true,
			fullWidth = true,
			type = 'text',
			style,
			...rest
		},
		ref
	) => {
		return (
			<div
				className={cn(className, styles.container, {
					[styles.errorInput]: error,
					[styles.underlined]: underlined,
					[styles.full_width]: fullWidth
				})}
				style={style}
			>
				<input ref={ref} type={type} data-testid={'Input.input'} {...rest} />
				{error && (
					<div data-testid={'Input.error'} className={styles.error}>
						{error.message}
					</div>
				)}
			</div>
		)
	}
)
