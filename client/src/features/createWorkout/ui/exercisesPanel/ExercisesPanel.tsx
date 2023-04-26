import React, { FC, useCallback } from 'react'
import { IoFunnelOutline } from 'react-icons/io5'
import { ExerciseList, useGetExercisesByMG } from '@/entities/Exercise'
import { Panel } from '@/widgets/panel'

import { Button, ButtonTheme } from '@/shared/ui'
import { useDispatch, useSelector } from 'react-redux'
import { createWorkoutActions } from '@/features/createWorkout'
import { getExerciseIds } from '@/features/createWorkout/model/selectors/getExerciseIds/getExerciseIds'
import styles from './ExercisesPanel.module.scss'

//todo: searchBar

interface ExercisesPanelProps {
	groupId: number
	setExercise: (id: number) => void
	onClose: () => void
}

export const ExercisesPanel: FC<ExercisesPanelProps> = props => {
	const { setExercise, onClose, groupId } = props

	const dispatch = useDispatch()
	const { data: exercises, error, isLoading } = useGetExercisesByMG(groupId)
	const exerciseIds = useSelector(getExerciseIds)

	const clearHandler = useCallback(() => {
		dispatch(createWorkoutActions.clearAll())
		onClose()
	}, [dispatch])
	//
	// if (isLoading) {
	// 	//todo: skeletons
	// 	return (
	// 		<div className={styles.exercises_panel}>
	// 			<h3>Loading</h3>
	// 		</div>
	// 	)
	// }
	//
	// if (error) {
	// 	return <h3>Something went wrong</h3>
	// }

	// const onExerciseClick = (id: number) => {
	// 	showExercises(false)
	// 	// showExercisesInfo(true)
	// 	// setExerciseId(id)
	// }

	return (
		<Panel
			className={styles.exercises_panel}
			title={'Exercises'}
			onClose={onClose}
			Icon={<IoFunnelOutline />}
		>
			<div className={styles.searchBar}></div>
			<ExerciseList
				className={styles.complete_icon}
				exercises={exercises}
				onClick={setExercise}
				type={'Exercise'}
			/>
			<div className={styles.buttons}>
				<Button
					className={styles.clear_btn}
					type={'button'}
					theme={ButtonTheme.CLEAR}
					onClick={clearHandler}
					disabled={exerciseIds.length === 0}
				>
					Clear
				</Button>
				<Button
					className={styles.add_btn}
					type={'button'}
					theme={ButtonTheme.CLEAR}
					onClick={onClose}
					disabled={exerciseIds.length === 0}
				>
					Add
				</Button>
			</div>
		</Panel>
	)
}
