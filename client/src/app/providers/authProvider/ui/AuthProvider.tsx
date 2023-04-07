import { ComponentAuthFields } from '../model/types/PageRoles'
import { getUserAuthData } from '@/entities/User'
import { logOut, refresh } from '@/features/authByEmail'
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/consts'
import { useAppDispatch } from '@/shared/lib/hooks'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'

const DynamicCheckRole = dynamic(() => import('../model/lib/CheckRole'), {
	ssr: false
})

export const AuthProvider: FC<ComponentAuthFields> = ({
	Component: { isOnlyForAdmin, isOnlyForUser, isNotForUser },
	children
}) => {
	const user = useSelector(getUserAuthData)
	const dispatch = useAppDispatch()
	const { pathname } = useRouter()

	useEffect(() => {
		const accessToken = Cookies.get(ACCESS_TOKEN_LOCAL_STORAGE_KEY)
		if (accessToken) dispatch(refresh())
	}, [])

	useEffect(() => {
		const accessToken = Cookies.get(ACCESS_TOKEN_LOCAL_STORAGE_KEY)
		if (!accessToken && user) dispatch(logOut())
	}, [pathname])

	return !isOnlyForAdmin && !isOnlyForUser && !isNotForUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole
			Component={{ isOnlyForAdmin, isOnlyForUser, isNotForUser }}
		>
			{children}
		</DynamicCheckRole>
	)
}
