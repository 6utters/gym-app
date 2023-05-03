import { FC, useState } from 'react'
import { Layout, Overlay, Transition, TransitionDirection } from '@/shared/ui'
import {
	CreateWorkoutForm,
	ExercisesInfoPanel,
	ExercisesPanel,
	MuscleGroupsPanel,
	ObjectivePanel
} from '@/features/createWorkout'

import styles from './ProgramCreationPage.module.scss'

export const ProgramCreationPage: FC = () => {
	const [showMuscleGroups, setShowMuscleGroups] = useState(false)
	const [showExercises, setShowExercises] = useState(false)
	const [showExerciseInfo, setShowExerciseInfo] = useState(false)
	const [showObjectives, setShowObjectives] = useState(false)

	const [currentMuscleGroup, setCurrentMuscleGroup] = useState(0)
	const [currentExercise, setCurrentExercise] = useState(0)
	const [exerciseObjectives, setExerciseObjectives] = useState(0)

	const setMuscleGroup = (id: number) => {
		setCurrentMuscleGroup(id)
		setShowExercises(true)
	}

	const setExercise = (id: number) => {
		setCurrentExercise(id)
		setShowExerciseInfo(true)
	}

	const setObjectives = (id: number) => {
		setExerciseObjectives(id)
		setShowObjectives(true)
	}

	const closeMGModal = () => {
		setShowMuscleGroups(false)
	}

	const closeExerciseModal = () => {
		setShowExercises(false)
	}

	const closeExerciseInfoModal = () => {
		setShowExerciseInfo(false)
	}

	const closeExerciseObjModal = () => {
		setShowObjectives(false)
	}

	const closeAllModals = () => {
		setShowExercises(false)
		setShowMuscleGroups(false)
		setShowExerciseInfo(false)
		setShowObjectives(false)
	}

	return (
		<Layout title={'Create Program'}>
			<Transition isOpen={showObjectives} direction={TransitionDirection.UP}>
				<ObjectivePanel
					exerciseId={exerciseObjectives}
					onClose={closeExerciseObjModal}
				/>
			</Transition>
			<Transition
				isOpen={showExerciseInfo}
				direction={TransitionDirection.LEFT}
			>
				<ExercisesInfoPanel
					onClose={closeExerciseInfoModal}
					exerciseId={currentExercise}
				/>
			</Transition>
			<Transition isOpen={showExercises} direction={TransitionDirection.LEFT}>
				<ExercisesPanel
					onClose={closeExerciseModal}
					setExercise={setExercise}
					groupId={currentMuscleGroup}
				/>
			</Transition>
			<Transition isOpen={showMuscleGroups}>
				<MuscleGroupsPanel onClose={closeMGModal} setGroup={setMuscleGroup} />
			</Transition>
			<div className={styles.wrapper}>
				<Overlay
					isOpen={showMuscleGroups || showObjectives}
					onClose={closeAllModals}
				/>
				<CreateWorkoutForm
					showMuscleGroups={setShowMuscleGroups}
					showObjectives={setObjectives}
				/>
			</div>
		</Layout>
	)
}
