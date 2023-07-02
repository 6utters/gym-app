import { FC, memo } from 'react'
import { getUserAuthData } from '@/entities/User'
import { useSelector } from 'react-redux'
import { LogOutButton } from '@/features/authByEmail'
import { Layout } from '@/shared/layouts'
import { capitalize } from '@/shared/lib'
import styles from './ProfilePage.module.scss'

export const ProfilePage: FC = memo(() => {
	const user = useSelector(getUserAuthData)

	if (!user) {
		throw new Error('Something wend wrong')
	}

	return (
		<Layout title={`ProfilePage`} extraButton={<LogOutButton />}>
			<main className={styles.wrapper}>
				<div className={styles.profile}>
					<p className={styles.greetings}>
						<strong>{capitalize(user.userName)}</strong>, Welcome to your
						profile!
					</p>
					<div className={styles.info}>
						<p>Different features and options are going to be released soon.</p>
					</div>
				</div>
			</main>
		</Layout>
	)
})
