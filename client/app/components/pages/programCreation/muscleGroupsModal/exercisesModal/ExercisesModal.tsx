import { FC, useState } from 'react'
import styles from './ExercisesModal.module.scss'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { exercisesApi } from '@/store/api/exercises.api'
import ExerciseInfo from '@/pages/programCreation/muscleGroupsModal/exercisesModal/exerciseInfo/ExerciseInfo'
import { CSSTransition } from 'react-transition-group'

interface IExercisesModalProps {
	setShow: (show: boolean) => void
	muscleGroupId: number
	muscleGroupName: string
}

const ExercisesModal: FC<IExercisesModalProps> = ({
	setShow,
	muscleGroupId,
	muscleGroupName
}) => {
	const { data } = exercisesApi.useGetExercisesByMuscleGroupQuery(muscleGroupId)
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
			<div className={styles.content}>
				<div className={styles.header}>
					<button type={'button'} onClick={() => setShow(false)}>
						<IoArrowForwardOutline className={styles.cross} />
					</button>
					<h1>{muscleGroupName} Exercises</h1>
				</div>
				<div className={styles.exercises}>
					{data &&
						data.map(exercise => (
							<div
								onClick={() => clickHandler(exercise.id)}
								className={styles.exercises__card}
								style={{
									backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(${process.env.APP_SERVER_URL}${exercise.thumbnailPath})`
								}}
								key={exercise.id}
							>
								<h2>{exercise.name}</h2>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default ExercisesModal
