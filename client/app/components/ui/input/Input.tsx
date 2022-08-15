import { forwardRef } from 'react'
import { IInput } from '@/components/ui/input/input.interface'
import cn from 'classnames'
import styles from './Input.module.scss'

const Input = forwardRef<HTMLInputElement, IInput>(
	({ placeholder, error, type = 'text', style, ...rest }, ref) => {
		return (
			<div className={cn(styles.common, styles.input)} style={style}>
				<label>
					<span>{placeholder}</span>
					<input ref={ref} type={type} {...rest} />
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

Input.displayName = 'Input'

export default Input
