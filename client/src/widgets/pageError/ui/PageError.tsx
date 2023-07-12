import { FC } from 'react'
import cn from 'classnames'
import styles from './PageError.module.scss'

interface PageErrorProps {
	className?: string
}

export const PageError: FC<PageErrorProps> = ({ className }) => {
	return (
		<div className={cn(styles.page_error, className)}>
			<h2>Something went wrong, reload the page please</h2>
		</div>
	)
}
