import { Layout } from '@/shared/layouts'
import { FC } from 'react'
import { useDeleteProgram, useGetPrograms } from '../api/programApi'
import { ProgramList } from '@/entities/Program'
import styles from './WorkoutsPage.module.scss'

export const WorkoutsPage: FC = () => {
	const { data: programs, isLoading, error } = useGetPrograms()
	const [deleteProgram] = useDeleteProgram()

	return (
		<Layout title={`Workouts`}>
			<div className={styles.container}>
				<ProgramList
					programs={programs || []}
					isLoading={isLoading}
					onDelete={deleteProgram}
					error={error}
				/>
			</div>
		</Layout>
	)
}
