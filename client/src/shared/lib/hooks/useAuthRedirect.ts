import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserAuthData } from '@/entities/User'

export const useAuthRedirect = () => {
	const user = useSelector(getUserAuthData)
	const { push } = useRouter()

	// const redirect = String(query.redirect) || '/workoutsPage'
	const redirect = '/workoutsPage'

	useEffect(() => {
		if (user) push(redirect)
	}, [user, push])
}
