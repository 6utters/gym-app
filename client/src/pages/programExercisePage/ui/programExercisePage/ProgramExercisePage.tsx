import { FC, memo, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ObjectivesBlock } from '@/entities/Objective'
import { Layout } from '@/shared/layouts'
import { AddProgressMenu } from '@/features/addProgress'
import { getDayProgress, StatisticsBlock } from '@/entities/Statisctics'
import { useRouter } from 'next/router'
import {
	useGetObjectives,
	useGetProgramExerciseIds
} from '@/pages/programExercisePage'
import { useGetExerciseById } from '@/entities/Exercise'
import { WORKOUTS_ROUTE } from '@/shared/consts'

import { useSelector } from 'react-redux'
import { Timeout } from '@/features/timeout/ui/timeout/Timeout'
import { Button } from '@/shared/ui'
import { useAppDispatch } from '@/shared/lib/hooks'
import { completeWorkout } from '@/entities/Program'
import { programDetailsActions } from '@/pages/programDetailsPage'
import { getCompletedWorkouts } from '@/pages/programDetailsPage/model/selectors/getCompletedWorkouts/getCompletedWorkouts'
import styles from './ProgramExercisePage.module.scss'

interface ProgramExercisePageProps {
	exerciseId: number
	programId: number
}

export const ProgramExercisePage: FC<ProgramExercisePageProps> = props => {
	const { exerciseId, programId } = props
	const router = useRouter()
	const dispatch = useAppDispatch()
	const [modal, setModal] = useState(false)

	useEffect(() => {
		dispatch(programDetailsActions.setCompletedWorkouts())
	}, [dispatch])

	const completedWorkouts = useSelector(getCompletedWorkouts)

	const isCompleted = Boolean(
		completedWorkouts.find(workout => workout.id === programId)
	)

	const { data: exerciseIds } = useGetProgramExerciseIds(programId, {
		skip: !programId
	})

	const { data: exercise } = useGetExerciseById(exerciseId, {
		skip: !programId
	})

	const todayProgress = useSelector(getDayProgress)
	const { data: objective } = useGetObjectives(
		{ exerciseId, programId },
		{ skip: !exerciseId || !programId }
	)

	const finishWorkout = useCallback(
		(id: number) => {
			dispatch(completeWorkout(id))
			router.push(`${WORKOUTS_ROUTE}/${programId}`)
		},
		[dispatch, programId, router]
	)

	const onNextButtonClick = useCallback(() => {
		if (exerciseIds) {
			const index = exerciseIds.findIndex(id => id === exerciseId)
			const nextIndex = index + 1
			if (nextIndex + 1 > exerciseIds.length) {
				finishWorkout(programId)
			}
			const nextExId = exerciseIds[nextIndex]
			router.push(`${WORKOUTS_ROUTE}/${programId}/ex/${nextExId}`)
		}
	}, [exerciseId, exerciseIds, finishWorkout, programId, router])

	if (!exercise || !exerciseIds) {
		return <div>loading exercise</div>
	}

	if (exerciseIds.findIndex(id => id == exerciseId) == -1) {
		router.replace(`${WORKOUTS_ROUTE}/${programId}`)
	}

	const NextButton = memo(() => (
		<Button
			theme='clear'
			onClick={onNextButtonClick}
			className={styles.next_btn}
			disabled={objective?.targetSets !== todayProgress.length}
		>
			Next
		</Button>
	))

	const FinishButton = () => (
		<Button
			onClick={() => finishWorkout(programId)}
			className={styles.finish_btn}
			disabled={objective?.targetSets !== todayProgress.length}
		>
			Finish
		</Button>
	)

	if (!objective) {
		return null
	}

	return (
		<Layout
			title={exercise ? exercise.group.name : ''}
			withReturn
			extraButton={
				isCompleted ? (
					''
				) : exerciseId + 1 > exerciseIds.length ? (
					<FinishButton />
				) : (
					<NextButton />
				)
			}
		>
			{modal && (
				<Timeout
					time={objective.timeout}
					isStarted={modal}
					onClose={() => setModal(false)}
				/>
			)}
			<div className={styles.program_exercise_page}>
				<div className={styles.video}>
					<Image
						src={process.env.APP_SERVER_URL + exercise.videoPath}
						width='100'
						height='100'
						sizes='100vh'
						alt='exercise_gif'
					/>
				</div>
				<div className={styles.title}>
					<h2>{exercise.name}</h2>
				</div>
				<ObjectivesBlock objective={objective} todayProgress={todayProgress} />
				<AddProgressMenu
					programId={programId}
					exerciseId={exerciseId}
					onAdd={() => setModal(true)}
				/>
				<StatisticsBlock programId={programId} exerciseId={exerciseId} />
			</div>
		</Layout>
	)
}
