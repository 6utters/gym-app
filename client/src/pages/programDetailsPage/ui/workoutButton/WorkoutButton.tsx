import { FC, memo } from 'react'
import { useGetProgress, useLastCompleted } from '@/shared/lib/hooks'
import { Program } from '@/entities/Program'
import { StartWorkoutButton } from './StartWorkoutButton'
import { CompleteWorkoutButton } from './CompleteWorkoutButton'
import { ContinueWorkoutButton } from './ContinueWorkoutButton'
import styles from './WorkoutButton.module.scss'

interface WorkoutButtonProps {
	program: Program
}

export const WorkoutButton: FC<WorkoutButtonProps> = memo(props => {
	const { program } = props
	const { progressPercentage, targetSets, todayStatistics } =
		useGetProgress(program)
	const lastCompletedId = useLastCompleted(program)

	if (!targetSets) {
		return null
	}

	if (progressPercentage === 0 && program) {
		return (
			<StartWorkoutButton
				className={styles.workout_btn}
				workoutId={program.id}
				firstExId={program.exercises[0].id}
			/>
		)
	} else if (todayStatistics && targetSets <= todayStatistics.length) {
		return (
			<CompleteWorkoutButton
				className={styles.workout_btn}
				workoutId={program.id}
			/>
		)
	} else {
		return (
			<ContinueWorkoutButton
				className={styles.workout_btn}
				workoutId={program.id}
				lastCompletedExId={program.exercises[lastCompletedId].id}
			/>
		)
	}
})
