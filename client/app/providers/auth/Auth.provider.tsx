import { FC, PropsWithChildren, useEffect } from 'react'
import { TypeComponentAuthFields } from '../../types/auth.types'
import { useAuth } from '@/hooks/useAuth'
import { useActions } from '@/hooks/useActions'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'

const DynamicCheckRole = dynamic(() => import('./CheckRoles'), { ssr: false })

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	children,
	Component: { isOnlyUser, isOnlyAdmin, isNotForUser }
}) => {
	const { isLoading } = useAuth()
	const { logout, checkAuth } = useActions()
	const { pathname } = useRouter()

	useEffect(() => {
		try {
			checkAuth()
		} catch (e) {
			logout()
		}
	}, [])

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		const user = localStorage.getItem('user')
		if (!accessToken && user && !isLoading) {
			logout()
		}
	}, [pathname])

	return !isOnlyUser && !isOnlyAdmin && !isNotForUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser, isNotForUser }}>
			{children}
		</DynamicCheckRole>
	)
}

export default AuthProvider
