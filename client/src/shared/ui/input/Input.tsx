import cn from 'classnames'
import { forwardRef, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import styles from './Input.module.scss'

export interface InputProps {
	error?: FieldError | undefined
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
				<input ref={ref} type={type} {...rest} />
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)
