import { FC } from 'react'
import { Exercise } from '@/entities/Exercise'
import styles from './ExerciseCard.module.scss'
import Image from 'next/image'
import { SERVER_URL } from '@/shared/consts'

//todo: card UI

interface ExerciseCardProps {
	exercise: Exercise
}

export const ExerciseCard: FC<ExerciseCardProps> = ({ exercise }) => {
	return (
		<div className={styles.card}>
			<div className={styles.image}>
				<Image
					src={SERVER_URL + exercise.thumbnailPath}
					alt={exercise.name}
					width='100'
					height='100'
					sizes='100vh'
				/>
			</div>
			<div className={styles.title}>
				<h2>{exercise.name}</h2>
			</div>
		</div>
	)
}
