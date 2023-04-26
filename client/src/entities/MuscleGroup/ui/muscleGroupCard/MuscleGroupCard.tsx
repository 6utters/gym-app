import { FC } from 'react'
import Image from 'next/image'
import { SERVER_URL } from '@/shared/consts'
import { MuscleGroup } from '@/entities/MuscleGroup'
import { IoChevronForwardSharp } from 'react-icons/io5'

import styles from './MuscleGroupCard.module.scss'

//todo: card UI

interface ExerciseCardProps {
	muscleGroup: MuscleGroup
	onClick: (value: number) => void
}

export const MuscleGroupCard: FC<ExerciseCardProps> = ({
	muscleGroup,
	onClick
}) => {
	const onClickHandler = (id: number) => {
		onClick(id)
	}

	return (
		<div className={styles.card} onClick={() => onClickHandler(muscleGroup.id)}>
			<div className={styles.main}>
				<div className={styles.image}>
					<Image
						src={SERVER_URL + muscleGroup.thumbnailPath}
						alt={muscleGroup.name}
						width='100'
						height='100'
						sizes='100vh'
					/>
				</div>
				<div className={styles.title}>
					<h2>{muscleGroup.name}</h2>
				</div>
			</div>
			<div className={styles.arrow_icon}>
				<IoChevronForwardSharp />
			</div>
		</div>
	)
}
