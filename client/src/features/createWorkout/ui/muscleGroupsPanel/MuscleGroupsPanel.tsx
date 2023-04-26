import React, { FC, useCallback } from 'react'
import { IoFunnelOutline } from 'react-icons/io5'
import { useGetMuscleGroups } from '@/entities/MuscleGroup'
import { MuscleGroupList } from '../../../../entities/MuscleGroup/ui/muscleGroupList/MuscleGroupList'
import { Panel } from '@/widgets/panel'

import styles from './MuscleGroupsPanel.module.scss'
import { Button, ButtonTheme } from '@/shared/ui'
import { useDispatch, useSelector } from 'react-redux'
import { getExerciseIds } from '@/features/createWorkout/model/selectors/getExerciseIds/getExerciseIds'
import { createWorkoutActions } from '@/features/createWorkout'

//todo: searchBar

interface MuscleGroupsModalProps {
	setGroup: (id: number) => void
	onClose: () => void
}

export const MuscleGroupsPanel: FC<MuscleGroupsModalProps> = props => {
	const { setGroup, onClose } = props
	const dispatch = useDispatch()
	const { data: muscleGroups, error, isLoading } = useGetMuscleGroups()
	const exerciseIds = useSelector(getExerciseIds)

	const clearHandler = useCallback(() => {
		dispatch(createWorkoutActions.clearAll())
		onClose()
	}, [dispatch])

	// if (isLoading) {
	// 	//todo: skeletons
	// 	return (
	// 		<div className={styles.muscle_groups_panel}>
	// 			<h3>Loading</h3>
	// 		</div>
	// 	)
	// }
	//
	// if (error) {
	// 	return <h3>Something went wrong</h3>
	// }

	return (
		<Panel
			className={styles.muscle_groups_panel}
			title={'Muscle Groups'}
			onClose={onClose}
			Icon={<IoFunnelOutline />}
		>
			<div className={styles.searchBar}></div>
			<MuscleGroupList muscleGroups={muscleGroups} onClick={setGroup} />
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
