import { NextPageWithRoles } from '@/app/providers/authProvider'
import Workouts from '@/pages/workouts/Workouts'
import Meta from '@/shared/lib/utils/meta/Meta'
import Layout from '@/shared/ui/layout/Layout'

const WorkoutsPage: NextPageWithRoles = () => {
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

WorkoutsPage.isOnlyForUser = true

export default WorkoutsPage
