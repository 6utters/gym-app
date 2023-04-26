import { ComponentAuthFields } from '../types/PageRoles'
import { getIsUserAdmin, getUserAuthData } from '@/entities/User'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useSelector } from 'react-redux'

const CheckRole: FC<ComponentAuthFields> = ({
	children,
	Component: { isOnlyForAdmin, isOnlyForUser, isNotForUser }
}) => {
	const user = useSelector(getUserAuthData)
	const isAdmin = useSelector(getIsUserAdmin)
	const isUser = Boolean(user && !isAdmin)
	const router = useRouter()
	const Children = () => <>{children}</>

	if ((isNotForUser && isAdmin) || (isNotForUser && isUser)) {
		router.pathname !== '/workouts' && router.replace('/workouts')
		return null
	}
	if (isAdmin) return <Children />
	if (isOnlyForAdmin) {
		router.pathname !== '/404' && router.replace('/404')
		return null
	}
	if (isUser && isOnlyForUser) return <Children />
	if (!isUser && !isAdmin && !isOnlyForUser && !isOnlyForAdmin)
		return <Children />
	else {
		router.pathname !== '/auth/signin' && router.replace('/auth/signin')
		return null
	}
}
export default CheckRole
