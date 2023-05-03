import { FC } from 'react'
import Image from 'next/image'
import { Card, CardSize } from '@/shared/ui'
import { SERVER_URL } from '@/shared/consts'

import { Exercise } from '@/entities/Exercise'
import { IoMenuOutline } from 'react-icons/io5'

import styles from './ExerciseCard.module.scss'

interface ExerciseCardProps {
	exercise: Exercise
	onClick: (id: number) => void
	className?: string
}

export const ExerciseCard: FC<ExerciseCardProps> = props => {
	const { exercise, className, onClick } = props

	const clickHandler = (id: number) => {
		onClick(id)
	}

	return (
		<Card size={CardSize.M} className={className}>
			<div className={styles.main} onClick={() => clickHandler(exercise.id)}>
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
			<div className={styles.icon}>
				<IoMenuOutline />
			</div>
		</Card>
	)
}
