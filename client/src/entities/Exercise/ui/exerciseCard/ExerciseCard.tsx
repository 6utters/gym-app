import { FC } from 'react'
import { Exercise } from '@/entities/Exercise'
import styles from './ExerciseCard.module.scss'
import Image from 'next/image'
import { SERVER_URL } from '@/shared/consts'
import { IoCheckmarkCircle, IoMenuOutline } from 'react-icons/io5'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import { getExerciseIds } from '@/features/createWorkout/model/selectors/getExerciseIds/getExerciseIds'
import { useAppDispatch } from '@/shared/lib/hooks'
import { createWorkoutActions } from '@/features/createWorkout'

//todo: card UI

export type ExerciseCardType = 'Exercise' | 'Program_exercise'

interface ExerciseCardProps {
	exercise: Exercise
	onClick: (id: number) => void
	type: ExerciseCardType
	className: string
}

export const ExerciseCard: FC<ExerciseCardProps> = props => {
	const { type, onClick, exercise, className } = props
	const exerciseIds = useSelector(getExerciseIds)
	const dispatch = useAppDispatch()

	const isSelected =
		type === 'Exercise' && Boolean(exerciseIds.find(id => exercise.id === id))

	const handleClick = (id: number) => {
		if (isSelected) {
			dispatch(createWorkoutActions.removeExercise(id))
		} else {
			dispatch(createWorkoutActions.addExercise(id))
		}
	}

	const renderIcon = (cardType: ExerciseCardType) => {
		switch (cardType) {
			case 'Exercise':
				return (
					<div
						className={cn(className, {
							[styles.active]: isSelected,
							[styles.not_active]: !isSelected
						})}
						onClick={() => handleClick(exercise.id)}
					>
						<IoCheckmarkCircle />
					</div>
				)
			case 'Program_exercise':
				return (
					<div
						className={cn(className, {
							[styles.active]: isSelected
						})}
					>
						{' '}
						<IoMenuOutline />
					</div>
				)
		}
	}

	return (
		<div className={styles.card}>
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
			{renderIcon(type)}
		</div>
	)
}
