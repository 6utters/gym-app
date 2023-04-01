import { NextPageAuth } from '../app/types/auth.types'
import Layout from '@/components/layout/Layout'
import Workouts from '@/pages/workouts/Workouts'
import Meta from '@/utils/meta/Meta'

const WorkoutsPage: NextPageAuth = () => {
	return (
		<Meta
			title={'Workouts Page'}
			description={'All your custom workout programs are gathered here.'}
		>
			<Layout title={'Workouts'}>
				<Workouts />
			</Layout>
		</Meta>
	)
}

WorkoutsPage.isOnlyUser = true

export default WorkoutsPage
