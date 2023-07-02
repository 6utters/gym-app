import { FC, memo, ReactNode } from 'react'
import Image from 'next/image'
import { Exercise } from '@/entities/Exercise'
import { SERVER_URL } from '@/shared/consts'

import styles from './ExerciseListItem.module.scss'
import cn from 'classnames'
import { useAppDispatch } from '@/shared/lib/hooks'
import { createWorkoutActions } from '@/features/createWorkout'

interface ExerciseListItemProps {
	exercise: Exercise
	onClick: (itemId: number) => void
	addon?: ReactNode
	onAddonClick?: (itemId: number) => void
	isSelected?: boolean
	draggable?: boolean
	selectedIndex?: number
	setIndex: (selectedIndex: number) => void
	index: number
}

export const ExerciseListItem: FC<ExerciseListItemProps> = memo(props => {
	const {
		onClick,
		exercise,
		addon,
		onAddonClick,
		isSelected,
		draggable,
		selectedIndex,
		setIndex,
		index
	} = props

	const dispatch = useAppDispatch()

	const onAddonClickHandler = () => {
		onAddonClick?.(exercise.id)
	}

	const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
		setIndex(index)
	}

	const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {}

	const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {}

	const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
	}

	const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		dispatch(
			createWorkoutActions.changeOrder({
				firstIndex: selectedIndex ?? 0,
				secondIndex: index
			})
		)
	}

	return (
		<div
			className={styles.exercise_list_item}
			draggable={draggable}
			onDragStart={e => dragStartHandler(e)}
			onDragEnd={e => dragEndHandler(e)}
			onDragLeave={e => dragLeaveHandler(e)}
			onDragOver={e => dragOverHandler(e)}
			onDrop={e => dropHandler(e)}
		>
			<div className={styles.main} onClick={() => onClick(exercise.id)}>
				<div className={styles.image}>
					<Image
						src={SERVER_URL + exercise.thumbnailPath}
						alt={exercise.name}
						width='93'
						height='93'
						sizes='93vw'
					/>
				</div>
				<div className={styles.title}>
					<h2>{exercise.name}</h2>
				</div>
			</div>
			<div
				className={cn(styles.addon, {
					[styles.active]: isSelected
				})}
				onClick={onAddonClickHandler}
			>
				{addon}
			</div>
		</div>
	)
})
