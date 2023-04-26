import { FC } from 'react'
import { Program } from '../../model/types/Program'

import { ProgramCard } from '@/entities/Program/ui/programCard/ProgramCard'
import styles from './ProgramList.module.scss'

interface ProgramListProps {
	programs: Program[]
	isLoading: boolean
	onDelete: (id: number) => void
}

export const ProgramList: FC<ProgramListProps> = props => {
	const { programs, isLoading, onDelete } = props

	if (isLoading) {
		//todo: skeletons
		return null
	}

	if (!isLoading && !programs?.length) {
		return (
			<div className={styles.no_exercises_wrapper}>
				<div className={styles.content}>
					<h3>Your list of workouts is empty.</h3>
					<p>Start your workout by adding a new work day.</p>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.program_list_wrapper}>
			<div className={styles.content}>
				{programs.map(program => (
					<ProgramCard key={program.id} program={program} onDelete={onDelete} />
				))}
			</div>
		</div>
	)
}
