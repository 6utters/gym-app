import { useActions } from '@/shared/lib/hooks/useActions'
import { useRouter } from 'next/router'

export const useLogout = () => {
	const { logout } = useActions()
	const router = useRouter()
	const clickHandler = () => {
		router.push('/')
		logout()
	}
	return { clickHandler }
}
