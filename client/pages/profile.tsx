import { NextPageAuth } from '../src/types/auth.types'
import Layout from '@/shared/ui/layout/Layout'
import Profile from '@/pages/profile/Profile'

const ProfilePage: NextPageAuth = () => {
	return (
		<Layout title={'Profile'}>
			<Profile />
		</Layout>
	)
}

ProfilePage.isOnlyUser = true

export default ProfilePage
