import { FC, memo } from 'react'
import { Program } from '../../model/types/Program'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Skeleton } from '@/shared/ui'
import { ProgramCard } from '../programCard/ProgramCard'
import { SerializedError } from '@reduxjs/toolkit'
import styles from './ProgramList.module.scss'

interface ProgramListProps {
	programs: Program[]
	isLoading: boolean
	onDelete: (id: number) => void
	error?: FetchBaseQueryError | SerializedError
}

export const ProgramList: FC<ProgramListProps> = memo(props => {
	const { programs, isLoading, onDelete, error } = props

	if (isLoading) {
		return (
			<div className={styles.program_list_wrapper}>
				<div className={styles.content}>
					<Skeleton width={'100%'} height={'6em'} border={'0.75rem'} />
					<Skeleton width={'100%'} height={'6em'} border={'0.75rem'} />
					<Skeleton width={'100%'} height={'6em'} border={'0.75rem'} />
					<Skeleton width={'100%'} height={'6em'} border={'0.75rem'} />
				</div>
			</div>
		)
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
})
