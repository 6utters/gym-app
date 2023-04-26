import { FC } from 'react'
import { MuscleGroupCard } from '../muscleGroupCard/MuscleGroupCard'
import { MuscleGroup } from '@/entities/MuscleGroup'
import styles from './MuscleGroupList.module.scss'

interface MuscleGroupListProps {
	muscleGroups?: MuscleGroup[]
	onClick: (id: number) => void
}

export const MuscleGroupList: FC<MuscleGroupListProps> = ({
	muscleGroups,
	onClick
}) => {
	if (!muscleGroups || muscleGroups.length === 0)
		return (
			<div className={styles.no_exercises}>
				<h3 className={styles.warning}>
					No muscle groups have been added yet.
				</h3>
			</div>
		)

	return (
		<ul className={styles.exercise_list}>
			{muscleGroups.map(muscleGroup => (
				<MuscleGroupCard
					key={muscleGroup.id}
					muscleGroup={muscleGroup}
					onClick={onClick}
				/>
			))}
		</ul>
	)
}
