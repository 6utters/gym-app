import { FC, useState } from 'react'
import styles from './MuscleGroupsModal.module.scss'
import { IoClose } from 'react-icons/io5'
import { muscleGroupsApi } from '@/store/api/muscleGroups.api'
import ExercisesModal from '@/pages/programCreation/muscleGroupsModal/exercisesModal/ExercisesModal'
import { CSSTransition } from 'react-transition-group'

const MuscleGroupsModal: FC<{
	setShowMuscleGroups: (type: boolean) => void
}> = ({ setShowMuscleGroups }) => {
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
			<div className={styles.content}>
				<div className={styles.header}>
					<button type={'button'} onClick={() => setShowMuscleGroups(false)}>
						<IoClose className={styles.cross} />
					</button>
					<h1>Muscle groups</h1>
					<div />
				</div>
				<div className={styles.muscle_groups}>
					{muscleGroups &&
						muscleGroups.map(group => (
							<div
								onClick={() => clickHandler(group.id, group.name)}
								className={styles.muscle_groups__card}
								style={{
									backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(${process.env.APP_SERVER_URL}${group.thumbnailPath})`
								}}
								key={group.id}
							>
								<h2>{group.name}</h2>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default MuscleGroupsModal
