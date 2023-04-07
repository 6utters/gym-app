import { NextPageWithRoles } from '@/app/providers/authProvider'
import ProgramCreation from '@/pages/programCreation/ProgramCreation'
import Layout from '@/shared/ui/layout/Layout'

const ProgramCreationPage: NextPageWithRoles = () => {
	return (
		<Layout title={'Create Workout'}>
			<ProgramCreation />
		</Layout>
	)
}

ProgramCreationPage.isOnlyForUser = true

export default ProgramCreationPage
