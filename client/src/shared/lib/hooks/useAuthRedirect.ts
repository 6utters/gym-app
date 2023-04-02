import { useAuth } from './useAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useAuthRedirect = () => {
	const { user } = useAuth()
	const { push } = useRouter()

	// const redirect = String(query.redirect) || '/workouts'
	const redirect = '/workouts'

	useEffect(() => {
		if (user) push(redirect)
	}, [user, push])
}
