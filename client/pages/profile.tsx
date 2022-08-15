import { NextPageAuth } from '../app/types/auth.types'
import Layout from '@/components/layout/Layout'
import Profile from '@/pages/profile/Profile'

const ProfilePage: NextPageAuth = () => {
	return (
		<Layout>
			<Profile />
		</Layout>
	)
}

ProfilePage.isOnlyUser = true

export default ProfilePage
