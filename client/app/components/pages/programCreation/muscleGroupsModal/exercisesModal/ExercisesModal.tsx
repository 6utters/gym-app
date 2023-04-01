import { FC, useState } from 'react'
import styles from './ExercisesModal.module.scss'
import { exercisesApi } from '@/store/api/exercises.api'
import ExerciseInfo from '@/pages/programCreation/muscleGroupsModal/exercisesModal/exerciseInfo/ExerciseInfo'
import { CSSTransition } from 'react-transition-group'
import WorkoutModal from '@/components/modals/workoutModal/WorkoutModal'

interface IExercisesModalProps {
	setShow: (show: boolean) => void
	muscleGroupId: number
	muscleGroupName: string
}

const ExercisesModal: FC<IExercisesModalProps> = ({
	setShow,
	muscleGroupId
}) => {
	const { data: exercises } =
		exercisesApi.useGetExercisesByMuscleGroupQuery(muscleGroupId)
	const [showExerciseInfo, setShowExerciseInfo] = useState(false)
	const [selectedExerciseId, setSelectedExerciseId] = useState(0)

	const clickHandler = (id: number) => {
		setSelectedExerciseId(id)
		setShowExerciseInfo(true)
	}

	return (
		<div className={styles.wrapper}>
			<CSSTransition
				in={showExerciseInfo}
				timeout={300}
				classNames={{
					enter: styles.exercise_info_enter,
					enterActive: styles.exercise_info_enter_active,
					exit: styles.exercise_info_exit,
					exitActive: styles.exercise_info_exit_active
				}}
				unmountOnExit
			>
				<ExerciseInfo
					setShowExerciseInfo={setShowExerciseInfo}
					exerciseId={selectedExerciseId}
				/>
			</CSSTransition>
			<WorkoutModal
				title={'Exercises'}
				type={'exercises'}
				itemsList={exercises}
				setModal={setShow}
				clickHandler={clickHandler}
			/>
		</div>
	)
}

export default ExercisesModal
