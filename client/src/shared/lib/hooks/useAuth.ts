import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector'

export const useAuth = () => useTypedSelector(state => state.auth)
