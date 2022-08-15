import { NextPageAuth } from '../app/types/auth.types'
import Layout from '@/components/layout/Layout'
import Workouts from '@/pages/workouts/Workouts'

const WorkoutsPage: NextPageAuth = () => {
	return (
		<Layout>
			<Workouts />
		</Layout>
	)
}

WorkoutsPage.isOnlyUser = true

export default WorkoutsPage
