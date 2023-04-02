import { NextPageAuth } from '../src/types/auth.types'
import Layout from '@/shared/ui/layout/Layout'
import Workouts from '@/pages/workouts/Workouts'
import Meta from '@/shared/lib/utils/meta/Meta'

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
