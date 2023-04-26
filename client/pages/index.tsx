import { NextPageWithRoles } from '@/app/providers/authProvider'
import { HomePage } from '@/pages/homePage'
import { Meta } from '@/shared/lib/utils/meta/Meta'

const Home: NextPageWithRoles = () => {
	return (
		<Meta
			title={'Initial Page'}
			description={'Initial page og the application'}
		>
			<HomePage />
		</Meta>
	)
}

Home.isNotForUser = true

export default Home
