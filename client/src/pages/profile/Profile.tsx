import styles from './Profile.module.scss'
import { getUserAuthData } from '@/entities/User'
import { FC } from 'react'
import { IoPerson } from 'react-icons/io5'
import { useSelector } from 'react-redux'

const Profile: FC = () => {
	const user = useSelector(getUserAuthData)
	// const { data: userData, isLoading } = $rtkApi.useGetUserQuery(null, {
	// 	skip: !user
	// })
	// const { clickHandler } = useLogout()

	console.log('user:', user)

	return (
		<div className={styles.wrapper}>
			{/*{isLoading ? (*/}
			{/*	<SkeletonLoader count={1} width={165} height={50} />*/}
			{/*) : (*/}
			<div className={styles.profile}>
				<div className={styles.user}>
					<IoPerson className={styles.user__icon} />
					{/*<p>{user?.email}</p>*/}
				</div>
				{/*<IoLogOutOutline className={styles.exit} onClick={clickHandler} />*/}
			</div>
			{/*)}*/}
		</div>
	)
}

export default Profile
