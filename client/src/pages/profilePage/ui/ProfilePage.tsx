import { getUserAuthData } from '@/entities/User'
import { getAuthByEmailIsLoading } from '@/features/authByEmail/model/selectors'
import { Layout } from '@/shared/ui'
import SkeletonLoader from '@/shared/ui/skeletonLoader/skeletonLoader'
import { FC } from 'react'
import { IoPerson } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { LogOutButton } from '@/features/authByEmail'

import styles from './Profile.module.scss'

const Profile: FC = () => {
	const user = useSelector(getUserAuthData)
	const isLoading = useSelector(getAuthByEmailIsLoading)

	return (
		<Layout title={`Profile`} extraButton={<LogOutButton />}>
			<div className={styles.wrapper}>
				{isLoading ? (
					<SkeletonLoader count={1} width={165} height={50} />
				) : (
					<div className={styles.profile}>
						<div className={styles.user}>
							<IoPerson className={styles.user__icon} />
							<p>{user?.email}</p>
						</div>
					</div>
				)}
			</div>
		</Layout>
	)
}

export default Profile
