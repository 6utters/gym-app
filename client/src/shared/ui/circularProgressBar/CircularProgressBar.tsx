import { FC, memo } from 'react'
import cn from 'classnames'
import { useProgress } from '../../lib/hooks'
import styles from './CircularProgressBar.module.scss'

interface CircularProgressBarProps {
	percentage: number
	circleWidth: number
	className?: string
	stats: string
	radius?: number
}

export const CircularProgressBar: FC<CircularProgressBarProps> = memo(props => {
	const { circleWidth, percentage, radius = 20, className, stats } = props
	const { dashOffset, dashArray } = useProgress({ percentage, radius })

	return (
		<div className={cn(styles.circular_progress_bar, className)}>
			<svg
				width={circleWidth}
				height={circleWidth}
				viewBox={`0 0 ${circleWidth} ${circleWidth}`}
			>
				<circle
					cx={circleWidth / 2}
					cy={circleWidth / 2}
					strokeWidth='3px'
					r={radius}
					className={styles.circle_background}
				/>
				<circle
					cx={circleWidth / 2}
					cy={circleWidth / 2}
					strokeWidth='3px'
					r={radius}
					className={styles.circle_progress}
					style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }}
					transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
				/>
				<text
					x='50%'
					y='50%'
					dy='0.3rem'
					textAnchor='middle'
					className={styles.circle_text}
				>
					{stats}
				</text>
			</svg>
		</div>
	)
})
