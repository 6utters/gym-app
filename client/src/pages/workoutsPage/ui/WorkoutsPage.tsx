import { Layout } from '@/shared/ui'
import { FC } from 'react'
import { useDeleteProgram, useGetPrograms } from '../model/api/programApi'
import styles from './WorkoutsPage.module.scss'
import { ProgramList } from '@/entities/Program'

export const WorkoutsPage: FC = () => {
	const { data: programs, isLoading, error } = useGetPrograms()
	const [deleteProgram] = useDeleteProgram()

	if (error) {
		//todo: error case
		return <div>Error</div>
	}

	return (
		<Layout title={`Workouts`}>
			<div className={styles.container}>
				<ProgramList
					programs={programs || []}
					isLoading={isLoading}
					onDelete={deleteProgram}
				/>
			</div>
		</Layout>
	)
}
