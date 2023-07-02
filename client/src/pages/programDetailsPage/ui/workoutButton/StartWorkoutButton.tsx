import { FC, memo } from 'react'
import { Button } from '@/shared/ui'
import { useRouter } from 'next/router'
import { WORKOUTS_ROUTE } from '@/shared/consts'

interface CompleteWorkoutButtonProps {
	className?: string
	workoutId: number
	firstExId: number
}

export const StartWorkoutButton: FC<CompleteWorkoutButtonProps> = memo(
	props => {
		const { workoutId, firstExId, className } = props
		const router = useRouter()

		const startWorkout = () => {
			router.push(`${WORKOUTS_ROUTE}/${workoutId}/ex/${firstExId}`)
		}

		return (
			<Button
				color='primary'
				fullWidth
				className={className}
				onClick={startWorkout}
			>
				Start Workout
			</Button>
		)
	}
)
