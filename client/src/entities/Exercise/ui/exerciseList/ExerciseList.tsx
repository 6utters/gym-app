import { FC, memo, ReactNode, useState } from 'react'
import { Exercise } from '../../model/types/Exercise'
import { ExerciseListItem } from '../exerciseListItem/ExerciseListItem'
import styles from './ExerciseList.module.scss'
import cn from 'classnames'

interface ExerciseListProps {
	exercises?: Exercise[]
	onItemClick: (itemId: number) => void
	className?: string
	addon?: ReactNode
	onClick?: () => void
	onAddonClick?: (itemId: number) => void
	selectedIds?: number[]
	isDraggable?: boolean
}

export const ExerciseList: FC<ExerciseListProps> = memo(props => {
	const {
		exercises,
		className,
		onItemClick,
		addon,
		onAddonClick,
		selectedIds,
		onClick,
		isDraggable
	} = props

	const [selectedIndex, setSelectedIndex] = useState<number | undefined>()

	if (!exercises || exercises.length === 0)
		return (
			<div
				className={cn(styles.exercise_list, className, styles.no_exercises)}
				onClick={onClick}
			>
				<h3 className={styles.warning}>Please add a new exercise.</h3>
			</div>
		)

	return (
		<ul className={cn(styles.exercise_list, className)}>
			{exercises.map((exercise, index) => (
				<ExerciseListItem
					index={index}
					setIndex={setSelectedIndex}
					draggable={isDraggable}
					isSelected={selectedIds?.includes(exercise.id)}
					key={exercise.id}
					selectedIndex={selectedIndex}
					addon={addon}
					exercise={exercise}
					onClick={onItemClick}
					onAddonClick={onAddonClick}
				/>
			))}
		</ul>
	)
})
