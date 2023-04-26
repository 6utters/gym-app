import styles from './Input.module.scss'
import cn from 'classnames'
import { forwardRef, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface InputProps {
	error: FieldError | undefined
	className?: string
}

export type InputPropsField = InputHTMLAttributes<HTMLInputElement> & InputProps

export const Input = forwardRef<HTMLInputElement, InputPropsField>(
	({ className, error, type = 'text', style, ...rest }, ref) => {
		return (
			<div
				className={cn(styles.container, className, {
					[styles.errorInput]: error
				})}
				style={style}
			>
				<input ref={ref} type={type} {...rest} />
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)
