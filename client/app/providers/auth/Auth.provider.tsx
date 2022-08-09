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
	Component: { isOnlyUser, isOnlyAdmin }
}) => {
	const { user } = useAuth()
	const { logout, checkAuth } = useActions()

	const { pathname } = useRouter()

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) checkAuth()
	}, [])

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) logout()
	}, [pathname])

	return !isOnlyUser && !isOnlyAdmin ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser }}>
			{children}
		</DynamicCheckRole>
	)
}

export default AuthProvider
