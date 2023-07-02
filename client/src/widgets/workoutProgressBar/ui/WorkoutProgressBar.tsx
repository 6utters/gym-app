import { FC, memo } from 'react'
import { Card, CardSize, CircularProgressBar } from '@/shared/ui'
import cn from 'classnames'
import { Program } from '@/entities/Program'
import { useGetProgress } from '@/shared/lib/hooks'
import styles from './WorkoutProgressBar.module.scss'

interface WorkoutProgressBarProps {
	className?: string
	isWorkoutCompleted?: boolean
	program: Program
}

export const WorkoutProgressBar: FC<WorkoutProgressBarProps> = memo(props => {
	const { className, program, isWorkoutCompleted } = props
	const { progressPercentage } = useGetProgress(program)

	if (isWorkoutCompleted) {
		return (
			<Card size={CardSize.M} className={cn(styles.progress_bar, className)}>
				<h2 className={styles.completed}>Completed!</h2>
			</Card>
		)
	}

	return (
		<Card size={CardSize.M} className={cn(styles.progress_bar, className)}>
			<CircularProgressBar
				percentage={progressPercentage}
				circleWidth={55}
				stats={`${progressPercentage}%`}
				className={styles.circle_bar}
			/>
			<h2>Keep doing what you&apos;re doing!</h2>
		</Card>
	)
})
