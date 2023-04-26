import React, { FC, useState } from 'react'
import { Button, ButtonTheme, Modal, ModalDirection } from '@/shared/ui'
import { IoArrowBackOutline, IoFunnelOutline } from 'react-icons/io5'
import { useGetMuscleGroups } from '@/entities/MuscleGroup'
import { MuscleGroupList } from '../muscleGroupList/MuscleGroupList'
import styles from './MuscleGroupsModal.module.scss'
import { CSSTransition } from 'react-transition-group'
import { ExerciseList } from '@/entities/Exercise/ui/exerciseList/ExerciseList'
import { useGetExercisesByMG } from '@/entities/Exercise'

//todo: searchBar

interface MuscleGroupsModalProps {
	isOpen: boolean
	onClose: () => void
	direction: ModalDirection
	setMuscleGroup: (value: number) => void
	muscleGroupId: number
}

export const MuscleGroupsModal: FC<MuscleGroupsModalProps> = props => {
	const { onClose, isOpen, direction, setMuscleGroup, muscleGroupId } = props

	const { data: muscleGroups, error, isLoading } = useGetMuscleGroups()
	const { data: exercises } = useGetExercisesByMG(muscleGroupId)
	const [showExercises, setShowExercises] = useState(false)
	const [showMuscleGroups, setShowMuscleGroups] = useState(true)

	if (isLoading) {
		//todo: skeletons
		return <h3>Loading</h3>
	}

	if (error) {
		return <h3>Something went wrong</h3>
	}

	const onMuscleGroupCLick = (id: number) => {
		setShowExercises(true)
		setShowMuscleGroups(false)
		setMuscleGroup(id)
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			direction={direction}
			className={styles.modal}
		>
			<div className={styles.modal_header}>
				<Button
					theme={ButtonTheme.CLEAR}
					className={styles.modal_header_btn}
					onClick={onClose}
				>
					<IoArrowBackOutline />
				</Button>
				<div className={styles.title}>
					<h2>Muscle Groups</h2>
				</div>
				<Button theme={ButtonTheme.CLEAR} className={styles.modal_header_btn}>
					<IoFunnelOutline />
				</Button>
			</div>
			<div className={styles.searchBar}></div>
			<CSSTransition
				in={showMuscleGroups}
				timeout={300}
				classNames={{
					enter: styles.exercises_enter,
					enterActive: styles.exercises_enter_active,
					exit: styles.exercises_exit,
					exitActive: styles.exercises_exit_active
				}}
				unmountOnExit
			>
				<MuscleGroupList
					muscleGroups={muscleGroups}
					onClick={onMuscleGroupCLick}
				/>
			</CSSTransition>
			<CSSTransition
				in={showExercises}
				timeout={300}
				classNames={{
					enter: styles.exercises_enter,
					enterActive: styles.exercises_enter_active,
					exit: styles.exercises_exit,
					exitActive: styles.exercises_exit_active
				}}
				unmountOnExit
			>
				<ExerciseList exercises={exercises} />
			</CSSTransition>
		</Modal>
	)
}
