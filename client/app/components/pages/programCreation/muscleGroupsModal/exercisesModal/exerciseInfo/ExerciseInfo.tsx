import { FC } from 'react'
import styles from './ExerciseInfo.module.scss'
import {
	IoAddCircleOutline,
	IoArrowForwardOutline,
	IoWarning
} from 'react-icons/io5'
import { exercisesApi } from '@/store/api/exercises.api'
import { filterText } from '@/utils/string/filterText'
import { programSlice } from '@/store/program/program.slice'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import cn from 'classnames'

//TODO: video design

interface IExerciseInfoProps {
	setShowExerciseInfo: (show: boolean) => void
	exerciseId: number
}

const ExerciseInfo: FC<IExerciseInfoProps> = ({
	setShowExerciseInfo,
	exerciseId
}) => {
	const { exerciseIds } = useTypedSelector(state => state.program)
	const dispatch = useDispatch()
	const { addExercise } = programSlice.actions
	const { data: exerciseInfo } =
		exercisesApi.useGetExerciseByIdQuery(exerciseId)

	const addExerciseToProgram = (id: number) => {
		dispatch(addExercise(id))
		setShowExerciseInfo(false)
	}

	const disabled = exerciseIds.some(id => id === exerciseId)

	return (
		<div className={styles.content}>
			{exerciseInfo && (
				<>
					<div className={styles.header}>
						<button type={'button'} onClick={() => setShowExerciseInfo(false)}>
							<IoArrowForwardOutline className={styles.cross} />
						</button>
						<h1>
							{exerciseInfo.name.length > 24
								? filterText(exerciseInfo.name, 24)
								: exerciseInfo.name}
						</h1>
						<button
							disabled={disabled}
							type={'button'}
							onClick={() => addExerciseToProgram(exerciseInfo.id)}
							className={cn({
								[styles.disabled]: disabled
							})}
						>
							<IoAddCircleOutline className={styles.add} />
						</button>
					</div>
					<div className={styles.main}>
						{/*<div className={styles.video}>*/}
						{/*	{exerciseInfo && (*/}
						{/*		<Image*/}
						{/*			src={process.env.APP_SERVER_URL + exerciseInfo.videoPath}*/}
						{/*			alt="exercise_gif"*/}
						{/*			layout="fill"*/}
						{/*			objectFit="cover"*/}
						{/*		/>*/}
						{/*	)}*/}
						{/*</div>*/}
						<div className={styles.main__info}>
							<h1>{exerciseInfo.name}</h1>
							<p>{exerciseInfo.description}</p>
						</div>
						<div className={styles.instructions}>
							<h3>Instruction</h3>
							{exerciseInfo.instructions.map((instr, index) => (
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
								{exerciseInfo.warnings.map(warning => (
									<li className={styles.warnings__item} key={warning.id}>
										<p>{warning.warning}</p>
									</li>
								))}
							</ul>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default ExerciseInfo
