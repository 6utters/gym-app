import { FC, memo } from 'react'
import { Layout } from '@/shared/layouts'
import { useGetProgramById } from '@/pages/programDetailsPage'
import { WorkoutProgressBar } from '@/widgets/workoutProgressBar'
import { WorkoutButton } from '../workoutButton/WorkoutButton'
import { ProgramDetailsList } from '../programDetailsList/ProgramDetailsList'

interface ProgramDetailsPageProps {
	programId: number
}

export const ProgramDetailsPage: FC<ProgramDetailsPageProps> = memo(props => {
	const { programId } = props

	const {
		data: program,
		error,
		isLoading
	} = useGetProgramById(programId, { skip: !programId })

	if (!program) {
		return null
	}

	if (isLoading) {
		return <div>loading</div>
	}

	const isWorkoutCompleted =
		new Date(program.completedDate as Date).toDateString() ===
		new Date().toDateString()

	return (
		<Layout title={program.name} withReturn>
			<WorkoutProgressBar
				program={program}
				isWorkoutCompleted={isWorkoutCompleted}
			/>
			<ProgramDetailsList program={program} />
			{isWorkoutCompleted || <WorkoutButton program={program} />}
		</Layout>
	)
})
