import { NextPageWithRoles } from '@/app/providers/authProvider'
import { Meta } from '@/shared/lib/utils/meta/Meta'
import { ProgramCreationPage } from '@/pages/programCreationPage'

const ProgramCreation: NextPageWithRoles = () => {
	return (
		<Meta
			title={'Create Workouts Page'}
			description={'Creation of a workout program'}
		>
			<ProgramCreationPage />
		</Meta>
	)
}

ProgramCreation.isOnlyForUser = true

export default ProgramCreation
