import React, { FC, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { IoCheckmarkSharp } from 'react-icons/io5'
import { ExerciseInfo, useGetExerciseById } from '@/entities/Exercise'
import { Panel } from '@/widgets/panel'
import { createWorkoutActions } from '@/features/createWorkout'

import styles from './ExerciseInfoPanel.module.scss'

interface ExercisesInfoPanelProps {
	exerciseId: number
	onClose: () => void
}

export const ExercisesInfoPanel: FC<ExercisesInfoPanelProps> = props => {
	const { exerciseId, onClose } = props

	const dispatch = useDispatch()
	const { data: exercise, error, isLoading } = useGetExerciseById(exerciseId)

	const addExercise = useCallback(() => {
		dispatch(createWorkoutActions.addExercise(exerciseId))
		onClose()
	}, [dispatch])

	return (
		<Panel
			className={styles.exercise_info_panel}
			title={'Exercises'}
			onClose={onClose}
			onIconClick={addExercise}
			Icon={<IoCheckmarkSharp />}
		>
			<div className={styles.searchBar}></div>
			<ExerciseInfo exercise={exercise} />
		</Panel>
	)
}
