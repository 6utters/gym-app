import { FC } from 'react'
import Skeleton, { SkeletonProps } from 'react-loading-skeleton'
import cn from 'classnames'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader: FC<SkeletonProps> = ({ className, ...rest }) => {
	return (
		<Skeleton
			{...rest}
			baseColor={'#8f8d8d'}
			highlightColor={'#aaaaad'}
			className={cn('rounded-lg', className)}
		/>
	)
}

export default SkeletonLoader
