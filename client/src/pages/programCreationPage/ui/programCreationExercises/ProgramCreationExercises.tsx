import { FC, memo, useCallback } from 'react'
import { Transition, TransitionDirection } from '@/shared/ui'
import { useAppDispatch } from '@/shared/lib/hooks'
import { useSelector } from 'react-redux'
import { ExercisesPanel } from '@/features/createWorkout'
import { programCreationActions } from '../../model/slice/programCreationSlice'
import { getCurrentMGId } from '../../model/selectors/getCurrentMGId/getCurrentMGId'
import { getIsExercisesPanelOpen } from '../../model/selectors/getIsExercisesPanelOpen/getIsExercisesPanelOpen'

export const ProgramCreationExercises: FC = memo(props => {
	const isExercisesPanelOpen = useSelector(getIsExercisesPanelOpen)
	const currentMuscleGroupId = useSelector(getCurrentMGId)
	const dispatch = useAppDispatch()

	const setExercise = useCallback(
		(id: number) => {
			dispatch(programCreationActions.setExercise(id))
		},
		[dispatch]
	)

	const closeExercisesModal = useCallback(() => {
		dispatch(programCreationActions.toggleExercisesPanel())
	}, [dispatch])

	return (
		<Transition
			isOpen={isExercisesPanelOpen}
			direction={TransitionDirection.LEFT}
		>
			<ExercisesPanel
				onClose={closeExercisesModal}
				setExercise={setExercise}
				groupId={currentMuscleGroupId}
			/>
		</Transition>
	)
})
