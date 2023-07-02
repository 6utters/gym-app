import { FC, memo } from 'react'
import { Button } from '@/shared/ui'
import { useRouter } from 'next/router'
import { WORKOUTS_ROUTE } from '@/shared/consts'

interface CompleteWorkoutButtonProps {
	className?: string
	workoutId: number
	lastCompletedExId: number
}

export const ContinueWorkoutButton: FC<CompleteWorkoutButtonProps> = memo(
	props => {
		const { workoutId, lastCompletedExId, className } = props
		const router = useRouter()

		const continueWorkout = () => {
			router.push(`${WORKOUTS_ROUTE}/${workoutId}/ex/${lastCompletedExId}`)
		}

		return (
			<Button
				color='primary'
				fullWidth
				className={className}
				onClick={continueWorkout}
			>
				Continue Workout
			</Button>
		)
	}
)
