import { FC } from 'react'
import { Exercise } from '../../model/types/Exercise'
import { ExerciseCard, ExerciseCardType } from '../exerciseCard/ExerciseCard'
import styles from './ExerciseList.module.scss'

interface ExerciseListProps {
	exercises?: Exercise[]
	onClick: (id: number) => void
	type: ExerciseCardType
	className: string
	selectedId?: number
}

export const ExerciseList: FC<ExerciseListProps> = props => {
	const { exercises, className, onClick, type, selectedId } = props
	if (!exercises || exercises.length === 0)
		return (
			<div className={styles.no_exercises}>
				<h3 className={styles.warning}>Please add a new exercise.</h3>
			</div>
		)

	return (
		<ul className={styles.exercise_list}>
			{exercises.map(exercise => (
				<ExerciseCard
					className={className}
					key={exercise.id}
					exercise={exercise}
					onClick={onClick}
					type={type}
				/>
			))}
		</ul>
	)
}
