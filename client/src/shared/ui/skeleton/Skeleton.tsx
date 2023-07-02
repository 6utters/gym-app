import { CSSProperties, FC, memo } from 'react'
import cn from 'classnames'
import styles from './Skeleton.module.scss'

interface SkeletonProps {
	className?: string
	height?: string | number
	width?: string | number
	border?: string
}

export const Skeleton: FC<SkeletonProps> = memo(props => {
	const { className, height, width } = props

	const additionalStyles: CSSProperties = {
		width,
		height
	}

	return (
		<div className={cn(styles.skeleton, className)} style={additionalStyles} />
	)
})
