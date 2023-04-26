import { FC } from 'react'
import Image from 'next/image'
import { IoWarning } from 'react-icons/io5'
import { Exercise } from '@/entities/Exercise'

import styles from './ExerciseInfo.module.scss'

interface ExerciseInfoProps {
	exercise?: Exercise
}

export const ExerciseInfo: FC<ExerciseInfoProps> = props => {
	const { exercise } = props

	if (!exercise) {
		return null
	}

	return (
		<div className={styles.exercise_info}>
			<div className={styles.video}>
				<Image
					src={process.env.APP_SERVER_URL + exercise.videoPath}
					width='100'
					height='100'
					sizes='100vh'
					alt='exercise_gif'
				/>
			</div>
			<div className={styles.main_info}>
				<h1>{exercise.name}</h1>
				<p>{exercise.description}</p>
			</div>
			<div className={styles.instructions}>
				<h3>Instruction</h3>
				{exercise.instructions.map((instr, index) => (
					<div className={styles.instructions__card} key={instr.id}>
						<h4>{index + 1}</h4>
						<p>{instr.instruction}</p>
					</div>
				))}
			</div>
			<div className={styles.warnings}>
				<h3>
					<IoWarning /> Warning!
				</h3>
				<ul>
					{exercise.warnings.map(warning => (
						<li className={styles.warnings__item} key={warning.id}>
							<p>{warning.warning}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
