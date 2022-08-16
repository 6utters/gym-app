import { FC } from 'react'
import Button from '@/components/ui/button/Button'
import { useActions } from '@/hooks/useActions'
import { useRouter } from 'next/router'

const Profile: FC = () => {
	const { logout } = useActions()
	const router = useRouter()

	const clickHandler = () => {
		router.push('/')
		logout()
	}

	return (
		<>
			<div>Profile</div>
			<Button onClick={clickHandler}>Log out</Button>
		</>
	)
}

export default Profile
