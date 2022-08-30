import React, { FC, useState } from 'react'
import styles from './MuscleGroupsModal.module.scss'
import { muscleGroupsApi } from '@/store/api/muscleGroups.api'
import ExercisesModal from '@/pages/programCreation/muscleGroupsModal/exercisesModal/ExercisesModal'
import { CSSTransition } from 'react-transition-group'
import WorkoutModal from '@/components/modals/workoutModal/WorkoutModal'

interface IMuscleGroupsModalProps {
	setShowMuscleGroups: (type: boolean) => void
}

const MuscleGroupsModal: FC<IMuscleGroupsModalProps> = ({
	setShowMuscleGroups
}) => {
	const [showExercises, setShowExercises] = useState(false)
	const [selectedMuscleGroupId, setSelectedMuscleGroupId] = useState(0)
	const [selectedMuscleGroupName, setSelectedMuscleGroupName] = useState('')
	const { data: muscleGroups } = muscleGroupsApi.useGetMuscleGroupsQuery(null)

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
				itemsList={muscleGroups}
				setModal={setShowMuscleGroups}
				clickHandler={clickHandler}
			/>
		</div>
	)
}

export default MuscleGroupsModal
