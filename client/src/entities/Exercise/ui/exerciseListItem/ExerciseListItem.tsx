import { FC } from 'react'
import Image from 'next/image'

import { useSelector } from 'react-redux'
import { IoCheckmarkCircle } from 'react-icons/io5'
import cn from 'classnames'
import { Exercise } from '@/entities/Exercise'
import { getExerciseIds } from '@/features/createWorkout/model/selectors/getExerciseIds/getExerciseIds'
import { createWorkoutActions } from '@/features/createWorkout'

import { useAppDispatch } from '@/shared/lib/hooks'
import { Card, CardSize } from '@/shared/ui'
import { SERVER_URL } from '@/shared/consts'

import styles from './ExerciseListItem.module.scss'

export type ExerciseCardType = 'Exercise' | 'Program_exercise'

interface ExerciseCardProps {
	exercise: Exercise
	onClick: (id: number) => void
	className: string
}

export const ExerciseListItem: FC<ExerciseCardProps> = props => {
	const { onClick, exercise, className } = props
	const exerciseIds = useSelector(getExerciseIds)
	const dispatch = useAppDispatch()

	const isSelected = Boolean(exerciseIds.find(id => exercise.id === id))

	const handleClick = (id: number) => {
		if (isSelected) {
			dispatch(createWorkoutActions.removeExercise(id))
		} else {
			dispatch(createWorkoutActions.addExercise(id))
		}
	}

	return (
		<Card size={CardSize.M}>
			<div className={styles.main} onClick={() => onClick(exercise.id)}>
				<div className={styles.image}>
					<Image
						src={SERVER_URL + exercise.thumbnailPath}
						alt={exercise.name}
						width='93'
						height='93'
						sizes='93vw'
					/>
				</div>
				<div className={styles.title}>
					<h2>{exercise.name}</h2>
				</div>
			</div>
			<div
				className={cn(className, {
					[styles.active]: isSelected,
					[styles.not_active]: !isSelected
				})}
				onClick={() => handleClick(exercise.id)}
			>
				<IoCheckmarkCircle />
			</div>
		</Card>
	)
}
