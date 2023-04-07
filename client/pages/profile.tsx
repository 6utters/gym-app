import { NextPageWithRoles } from '@/app/providers/authProvider'
import Profile from '@/pages/profile/Profile'
import Layout from '@/shared/ui/layout/Layout'

const ProfilePage: NextPageWithRoles = () => {
	return (
		<Layout title={'Profile'}>
			<Profile />
		</Layout>
	)
}

ProfilePage.isOnlyForUser = true

export default ProfilePage
