import { FC, memo, useCallback } from 'react'
import { Transition, TransitionDirection } from '@/shared/ui'
import { ObjectivePanel } from '@/features/createWorkout'
import { useAppDispatch } from '@/shared/lib/hooks'
import { useSelector } from 'react-redux'
import { getIsObjectivesExerciseOpen } from '../../model/selectors/getIsObjectivesExerciseOpen/getIsObjectivesExerciseOpen'
import { getCurrentObjExercise } from '../../model/selectors/getCurrentObjExercise/getCurrentObjExercise'
import { programCreationActions } from '../../model/slice/programCreationSlice'

export const ProgramCreationObjectives: FC = memo(() => {
	const isObjectivesExerciseOpen = useSelector(getIsObjectivesExerciseOpen)
	const objectivesExerciseId = useSelector(getCurrentObjExercise)
	const dispatch = useAppDispatch()

	const closeExerciseObjModal = useCallback(() => {
		dispatch(programCreationActions.toggleObjectivesPanel())
	}, [dispatch])

	return (
		<Transition
			isOpen={isObjectivesExerciseOpen}
			direction={TransitionDirection.UP}
		>
			<ObjectivePanel
				exerciseId={objectivesExerciseId}
				onClose={closeExerciseObjModal}
			/>
		</Transition>
	)
})
