import { FC } from 'react'
import { ExerciseList } from '@/entities/Exercise/ui/exerciseList/ExerciseList'
import { Button, ButtonTheme, Modal, ModalDirection } from '@/shared/ui'
import { IoArrowBackOutline, IoFunnelOutline } from 'react-icons/io5'
import { useGetExercisesByMG } from '@/entities/Exercise'
import styles from './ExercisesModal.module.scss'

//todo: searchBar

interface ExercisesModalProps {
	isOpen: boolean
	onClose: () => void
	direction: ModalDirection.LEFT
	muscleGroupId: number
}

export const ExercisesModal: FC<ExercisesModalProps> = props => {
	const { onClose, isOpen, direction, muscleGroupId } = props

	const {
		data: exercises,
		error,
		isLoading
	} = useGetExercisesByMG(muscleGroupId)

	if (isLoading) {
		//todo: skeletons
		return <h3>Loading</h3>
	}

	if (error) {
		return <h3>Something went wrong</h3>
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
					<h2>Exercises</h2>
				</div>
				<Button theme={ButtonTheme.CLEAR} className={styles.modal_header_btn}>
					<IoFunnelOutline />
				</Button>
			</div>
			<div className={styles.searchBar}></div>
			<ExerciseList exercises={exercises} className={styles.exercise_list} />
		</Modal>
	)
}
