import { FC, PropsWithChildren } from 'react'
import { TypeComponentAuthFields } from '../../types/auth.types'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'

const CheckRoles: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	children,
	Component: { isOnlyUser, isOnlyAdmin }
}) => {
	const { user } = useAuth()
	const router = useRouter()

	const Children = () => <>{children}</>

	const isAdmin = user?.roles.some(role => role.value === 'ADMIN')
	if (isAdmin) return <Children />

	if (isOnlyAdmin) {
		router.pathname !== '/404' && router.replace('404')
		return null
	}

	const isUser = user && !isAdmin

	if (isUser && isOnlyUser) return <Children />
	else {
		router.pathname !== '/auth' && router.replace('auth')
		return null
	}
}

export default CheckRoles
