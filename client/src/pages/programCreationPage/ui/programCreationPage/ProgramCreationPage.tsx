import { FC, memo, useCallback, useEffect } from 'react'
import { Layout } from '@/shared/layouts'
import { CreateWorkoutForm } from '@/features/createWorkout'
import { useAppDispatch } from '@/shared/lib/hooks'
import { programCreationActions } from '@/pages/programCreationPage'
import { ProgramCreationObjectives } from '../programCreationObjectives/ProgramCreationObjectives'
import { ProgramCreationExercises } from '../programCreationExercises/ProgramCreationExercises'
import { ProgramCreationExInfoPanel } from '../programCreationExInfoPanel/ProgramCreationExInfoPanel'
import { ProgramCreationMuscleGroups } from '../programCreationMuscleGroups/ProgramCreationMuscleGroups'
import { Overlay } from '@/shared/ui'
import { useSelector } from 'react-redux'
import { getIsMGPanelOpen } from '../../model/selectors/getIsMGPanelOpen/getIsMGPanelOpen'
import { getIsObjectivesExerciseOpen } from '../../model/selectors/getIsObjectivesExerciseOpen/getIsObjectivesExerciseOpen'

export const ProgramCreationPage: FC = memo(() => {
	const dispatch = useAppDispatch()
	const isMGPanelOpen = useSelector(getIsMGPanelOpen)
	const isObjectivesExerciseOpen = useSelector(getIsObjectivesExerciseOpen)

	useEffect(() => {
		return () => {
			dispatch(programCreationActions.reset())
		}
	}, [dispatch])

	const closeAllModals = useCallback(() => {
		dispatch(programCreationActions.closeAllPanels())
	}, [dispatch])

	return (
		<Layout title={'Create Program'}>
			<ProgramCreationObjectives />
			<ProgramCreationExInfoPanel />
			<ProgramCreationExercises />
			<ProgramCreationMuscleGroups />
			<Overlay
				isOpen={isMGPanelOpen || isObjectivesExerciseOpen}
				onClose={closeAllModals}
			/>
			<CreateWorkoutForm />
		</Layout>
	)
})
