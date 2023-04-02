import Layout from '@/shared/ui/layout/Layout'
import { NextPageAuth } from '../../src/types/auth.types'
import ProgramCreation from '@/pages/programCreation/ProgramCreation'

const ProgramCreationPage: NextPageAuth = () => {
	return (
		<Layout title={'Create Workout'}>
			<ProgramCreation />
		</Layout>
	)
}

export default ProgramCreationPage
