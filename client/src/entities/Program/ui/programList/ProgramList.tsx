import { FC } from 'react'
import { Program } from '../../model/types/Program'

import { ProgramCard } from '@/entities/Program/ui/programCard/ProgramCard'
import styles from './ProgramList.module.scss'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

interface ProgramListProps {
	programs: Program[]
	isLoading: boolean
	onDelete: (id: number) => void
	error?: FetchBaseQueryError | SerializedError
}

export const ProgramList: FC<ProgramListProps> = props => {
	const { programs, isLoading, onDelete, error } = props

	if (isLoading) {
		//todo: skeletons
		return null
	}

	if (error) {
		return (
			<div className={styles.card}>
				<div className={styles.content}>
					<h3>Something went wrong...</h3>
				</div>
			</div>
		)
	}

	if (!isLoading && !programs?.length) {
		return (
			<div className={styles.card}>
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
