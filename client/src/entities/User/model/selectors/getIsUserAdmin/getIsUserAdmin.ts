import { StateSchema } from '@/app/providers/storeProvider'
import { RoleTypes } from '../../consts/userRoles'

export const getIsUserAdmin = (state: StateSchema) =>
	!!state.user.authData?.roles?.some(role => role.value === RoleTypes.ADMIN)
