import { FC, memo, useCallback } from 'react'
import { Transition } from '@/shared/ui'
import { useAppDispatch } from '@/shared/lib/hooks'
import { useSelector } from 'react-redux'
import { MuscleGroupsPanel } from '@/features/createWorkout'
import { programCreationActions } from '../../model/slice/programCreationSlice'
import { getIsMGPanelOpen } from '../../model/selectors/getIsMGPanelOpen/getIsMGPanelOpen'

export const ProgramCreationMuscleGroups: FC = memo(props => {
	const isMGPanelOpen = useSelector(getIsMGPanelOpen)
	const dispatch = useAppDispatch()

	const setMuscleGroup = useCallback(
		(id: number) => {
			dispatch(programCreationActions.setMuscleGroup(id))
		},
		[dispatch]
	)

	const closeMGModal = useCallback(() => {
		dispatch(programCreationActions.toggleMuscleGroupsPanel())
	}, [dispatch])

	return (
		<Transition isOpen={isMGPanelOpen}>
			<MuscleGroupsPanel onClose={closeMGModal} setGroup={setMuscleGroup} />
		</Transition>
	)
})
