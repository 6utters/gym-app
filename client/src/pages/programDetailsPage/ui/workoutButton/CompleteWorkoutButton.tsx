import { FC, memo } from 'react'
import { Button } from '@/shared/ui'
import { useAppDispatch } from '@/shared/lib/hooks'
import { completeWorkout } from '@/entities/Program'
import { useRouter } from 'next/router'
import { WORKOUTS_ROUTE } from '@/shared/consts'

interface CompleteWorkoutButtonProps {
	workoutId: number
	className?: string
}

export const CompleteWorkoutButton: FC<CompleteWorkoutButtonProps> = memo(
	props => {
		const { workoutId, className } = props
		const dispatch = useAppDispatch()
		const router = useRouter()

		const finishWorkout = () => {
			dispatch(completeWorkout(workoutId))
			router.push(WORKOUTS_ROUTE)
		}

		return (
			<Button
				color='primary'
				fullWidth
				className={className}
				onClick={finishWorkout}
			>
				Finish Workout
			</Button>
		)
	}
)
