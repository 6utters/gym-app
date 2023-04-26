import React, { FC, useState } from 'react'
import styles from './MuscleGroupsModal.module.scss'
import ExercisesModal from '@/pages/programCreationPage/muscleGroupsModal/exercisesModal/ExercisesModal'
import { CSSTransition } from 'react-transition-group'
import WorkoutModal from '@/shared/ui/modals/workoutModal/WorkoutModal'
import { useGetMuscleGroups } from '@/entities/MuscleGroup'

interface IMuscleGroupsModalProps {
	setShowMuscleGroups: (type: boolean) => void
}

const MuscleGroupsModal: FC<IMuscleGroupsModalProps> = ({
	setShowMuscleGroups
}) => {
	const [showExercises, setShowExercises] = useState(false)
	const [selectedMuscleGroupId, setSelectedMuscleGroupId] = useState(0)
	const [selectedMuscleGroupName, setSelectedMuscleGroupName] = useState('')
	const { data: muscleGroups } = useGetMuscleGroups()

	const clickHandler = (groupId: number, groupName: string) => {
		setSelectedMuscleGroupId(groupId)
		setSelectedMuscleGroupName(groupName)
		setShowExercises(true)
	}

	return (
		<div className={styles.wrapper}>
			<CSSTransition
				in={showExercises}
				timeout={300}
				classNames={{
					enter: styles.exercises_enter,
					enterActive: styles.exercises_enter_active,
					exit: styles.exercises_exit,
					exitActive: styles.exercises_exit_active
				}}
				unmountOnExit
			>
				<ExercisesModal
					muscleGroupName={selectedMuscleGroupName}
					setShow={setShowExercises}
					muscleGroupId={selectedMuscleGroupId}
				/>
			</CSSTransition>
			<WorkoutModal
				title={'Muscle groups'}
				type={'muscle_group'}
				setModal={setShowMuscleGroups}
			/>
		</div>
	)
}

export default MuscleGroupsModal
