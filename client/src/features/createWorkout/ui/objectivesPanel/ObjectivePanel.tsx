import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoFunnelOutline } from 'react-icons/io5'
import { Panel } from '@/widgets/panel'

import { useGetExerciseById } from '@/entities/Exercise'
import { Objective } from '@/entities/Objective'
import {
	createWorkoutActions,
	getObjectiveById,
	getObjectives
} from '@/features/createWorkout'

import { Button, ButtonTheme, Input } from '@/shared/ui'
import { convertTime } from '@/shared/lib'

import styles from './ObjectivePanel.module.scss'

interface ObjectivePanelProps {
	exerciseId: number
	onClose: () => void
}

export const ObjectivePanel: FC<ObjectivePanelProps> = props => {
	const { exerciseId, onClose } = props
	const dispatch = useDispatch()

	const defaultObjective: Objective = {
		exerciseId,
		targetSets: 3,
		targetReps: 12,
		timeout: 90000
	}

	const objectives = useSelector(getObjectives)
	const { data: exercise } = useGetExerciseById(exerciseId)

	const currentObjective = getObjectiveById(objectives, exerciseId)

	const [objective, setObjective] = useState<Objective>(
		currentObjective || defaultObjective
	)

	const onClearClick = (exercisesId: number) => {
		dispatch(createWorkoutActions.clearObjective(exercisesId))
		onClose()
	}

	const onSaveClick = (objective: Objective) => {
		if (currentObjective) {
			dispatch(createWorkoutActions.changeObjective(objective))
			return onClose()
		}
		dispatch(createWorkoutActions.addObjective(objective))
		onClose()
	}

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

	return (
		<Panel
			className={styles.objective_panel}
			title={exercise?.name}
			onClose={onClose}
			Icon={<IoFunnelOutline />}
		>
			<div className={styles.content}>
				<div className={styles.objectives}>
					<div className={styles.sets_reps}>
						<div className={styles.sets}>
							<h3>Sets</h3>
							<Input
								className={styles.sets}
								type={'number'}
								value={objective.targetSets}
								onChange={e =>
									setObjective(prevState => ({
										...prevState,
										targetSets: +e.target.value
									}))
								}
							/>
						</div>
						<div className={styles.reps}>
							<h3>Reps</h3>
							<Input
								className={styles.reps}
								type={'number'}
								value={objective.targetReps}
								onChange={e =>
									setObjective(prevState => ({
										...prevState,
										targetReps: +e.target.value
									}))
								}
							/>
						</div>
					</div>
					<div className={styles.rest}>
						<h3>Rest time</h3>
						<Input
							className={styles.timeout}
							type={'time'}
							value={convertTime(objective.timeout)}
							onChange={e =>
								setObjective(
									prevState =>
										({
											...prevState,
											timeout: convertTime(e.target.value)
										} as Objective)
								)
							}
						/>
					</div>
				</div>
				<div className={styles.buttons}>
					<Button
						className={styles.clear_btn}
						type={'button'}
						theme={ButtonTheme.CLEAR}
						onClick={() => onClearClick(exerciseId)}
					>
						Clear
					</Button>
					<Button
						className={styles.add_btn}
						type={'button'}
						theme={ButtonTheme.CLEAR}
						onClick={() => onSaveClick(objective)}
					>
						Save
					</Button>
				</div>
			</div>
		</Panel>
	)
}
