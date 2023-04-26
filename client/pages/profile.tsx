import { NextPageWithRoles } from '@/app/providers/authProvider'
import { Meta } from '@/shared/lib/utils/meta/Meta'
import { ProfilePage } from '@/pages/profilePage'

const Profile: NextPageWithRoles = () => {
	return (
		<Meta
			title={'ProfilePage Page'}
			description={'Your personal Gym App ProfilePage.'}
		>
			<ProfilePage />
		</Meta>
	)
}

Profile.isOnlyForUser = true

export default Profile
