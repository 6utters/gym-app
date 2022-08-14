import Layout from '@/components/layout/Layout'
import { NextPageAuth } from '../../app/types/auth.types'
import ProgramCreation from '@/pages/programCreation/ProgramCreation'

const ProgramCreationPage: NextPageAuth = () => {
	return (
		<Layout>
			<ProgramCreation />
		</Layout>
	)
}

export default ProgramCreationPage
