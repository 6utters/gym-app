import React, { FC, memo, useCallback } from 'react'
import { IoCheckmarkCircle, IoFunnelOutline } from 'react-icons/io5'
import { ExerciseList, useGetExercisesByMG } from '@/entities/Exercise'
import { Panel } from '@/widgets/panel'
import { Button } from '@/shared/ui'
import { useDispatch, useSelector } from 'react-redux'
import { createWorkoutActions } from '@/features/createWorkout'
import { getExerciseIds } from '@/features/createWorkout/model/selectors/getExerciseIds/getExerciseIds'
import cn from 'classnames'
import styles from './ExercisesPanel.module.scss'

//todo: searchBar

interface ExercisesPanelProps {
	groupId: number
	setExercise: (id: number) => void
	onClose: () => void
}

const Addon = memo(() => (
	<div className={cn(styles.complete_icon)}>
		<IoCheckmarkCircle />
	</div>
))

export const ExercisesPanel: FC<ExercisesPanelProps> = props => {
	const { setExercise, onClose, groupId } = props
	const dispatch = useDispatch()

	const { data: exercises, error, isLoading } = useGetExercisesByMG(groupId)
	const selectedExerciseIds = useSelector(getExerciseIds)

	const clearHandler = useCallback(() => {
		dispatch(createWorkoutActions.clearAll())
		onClose()
	}, [dispatch, onClose])

	const handleClick = useCallback(
		(id: number) => {
			if (selectedExerciseIds.includes(id)) {
				dispatch(createWorkoutActions.removeExercise(id))
			} else {
				dispatch(createWorkoutActions.addExercise(id))
			}
		},
		[dispatch, selectedExerciseIds]
	)

	return (
		<Panel
			className={styles.exercises_panel}
			title={'Exercises'}
			onClose={onClose}
			Icon={<IoFunnelOutline />}
		>
			<div className={styles.searchBar}></div>
			<ExerciseList
				exercises={exercises}
				onItemClick={setExercise}
				addon={<Addon />}
				onAddonClick={handleClick}
				selectedIds={selectedExerciseIds}
			/>
			<div className={styles.buttons}>
				<Button
					fullWidth
					theme='outlined'
					className={styles.clear_btn}
					onClick={clearHandler}
					disabled={selectedExerciseIds.length === 0}
				>
					Clear
				</Button>
				<Button
					fullWidth
					className={styles.add_btn}
					onClick={onClose}
					disabled={selectedExerciseIds.length === 0}
				>
					Add
				</Button>
			</div>
		</Panel>
	)
}
