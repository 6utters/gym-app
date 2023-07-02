import { FC, memo, useCallback } from 'react'
import { Transition, TransitionDirection } from '@/shared/ui'
import { useAppDispatch } from '@/shared/lib/hooks'
import { useSelector } from 'react-redux'
import { ExercisesInfoPanel } from '@/features/createWorkout'
import { programCreationActions } from '../../model/slice/programCreationSlice'
import { getIsExerciseInfoPanelOpen } from '../../model/selectors/getIsExerciseInfoPanelOpen/getIsExerciseInfoPanelOpen'
import { getCurrentExerciseId } from '../../model/selectors/getCurrentExerciseId/getCurrentExerciseId'

export const ProgramCreationExInfoPanel: FC = memo(props => {
	const isExerciseInfoPanelOpen = useSelector(getIsExerciseInfoPanelOpen)
	const currentExerciseId = useSelector(getCurrentExerciseId)
	const dispatch = useAppDispatch()

	const closeExerciseInfoModal = useCallback(() => {
		dispatch(programCreationActions.toggleExerciseInfoPanel())
	}, [dispatch])

	return (
		<Transition
			isOpen={isExerciseInfoPanelOpen}
			direction={TransitionDirection.LEFT}
		>
			<ExercisesInfoPanel
				onClose={closeExerciseInfoModal}
				exerciseId={currentExerciseId}
			/>
		</Transition>
	)
})
