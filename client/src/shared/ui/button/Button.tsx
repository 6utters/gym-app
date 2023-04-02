import { FC, PropsWithChildren } from 'react'
import styles from './Button.module.scss'
import cn from 'classnames'
import { IButton } from '@/shared/ui/button/button.inteface'

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	...rest
}) => {
	return (
		<button className={cn(styles.button, className)} {...rest}>
			{children}
		</button>
	)
}

export default Button
