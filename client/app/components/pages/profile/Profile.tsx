import { FC } from 'react'
import { useAuth } from '@/hooks/useAuth'
import styles from './Profile.module.scss'
import { IoLogOutOutline, IoPerson } from 'react-icons/io5'
import { useLogout } from '@/hooks/useLogout'
import SkeletonLoader from '@/components/ui/skeletonLoader/skeletonLoader'
import { api } from '@/store/api/api'

const Profile: FC = () => {
	const { user } = useAuth()
	const { data: userData, isLoading } = api.useGetUserQuery(null, {
		skip: !user
	})
	const { clickHandler } = useLogout()

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<SkeletonLoader count={1} width={165} height={50} />
			) : (
				<div className={styles.profile}>
					<div className={styles.user}>
						<IoPerson className={styles.user__icon} />
						<p>{userData?.email}</p>
					</div>
					<IoLogOutOutline className={styles.exit} onClick={clickHandler} />
				</div>
			)}
		</div>
	)
}

export default Profile
