import { FC, useState } from 'react'
import styles from './ProgramCreationPage.module.scss'
import { Layout, ModalDirection } from '@/shared/ui'
import { CreateWorkoutForm } from '@/features/createWorkout'
import { MuscleGroupsModal } from '@/entities/MuscleGroup/ui/muscleGroupsModal/MuscleGroupsModal'

export const ProgramCreationPage: FC = () => {
	const [currentMuscleGroup, setCurrentMuscleGroup] = useState(3)
	const [showMuscleGroups, setShowMuscleGroups] = useState(false)

	const closeMGModal = () => {
		setShowMuscleGroups(false)
	}

	return (
		<Layout title={'Create Program'}>
			<MuscleGroupsModal
				muscleGroupId={currentMuscleGroup}
				direction={ModalDirection.UP}
				isOpen={showMuscleGroups}
				onClose={closeMGModal}
				setMuscleGroup={setCurrentMuscleGroup}
			/>
			<div className={styles.wrapper}>
				<CreateWorkoutForm openModal={setShowMuscleGroups} />
			</div>
		</Layout>
	)
}
