import { FC } from 'react'
import { Exercise } from '../../model/types/Exercise'
import styles from './ExerciseList.module.scss'
import { ExerciseCard } from '../exerciseCard/ExerciseCard'

interface ExerciseListProps {
	exercises?: Exercise[]
}

export const ExerciseList: FC<ExerciseListProps> = ({ exercises }) => {
	console.log('exercises:', exercises)
	if (!exercises || exercises.length === 0)
		return (
			<div className={styles.no_exercises}>
				<h3 className={styles.warning}>Please add a new exercise.</h3>
			</div>
		)

	return (
		<ul className={styles.exercise_list}>
			{exercises.map(exercise => (
				<ExerciseCard key={exercise.id} exercise={exercise} />
			))}
		</ul>
	)
}
