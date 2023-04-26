import { NextPageWithRoles } from '@/app/providers/authProvider'
import { Meta } from '@/shared/lib/utils/meta/Meta'
import { WorkoutsPage } from '@/pages/workoutsPage'

const Workouts: NextPageWithRoles = () => {
	return (
		<Meta
			title={'Workouts Page'}
			description={'All of your custom workout programs are gathered here.'}
		>
			<WorkoutsPage />
		</Meta>
	)
}

Workouts.isOnlyForUser = true

export default Workouts
