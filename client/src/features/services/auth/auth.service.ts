import { axiosClassic } from '../../../shared/api/axiosApi'
import {
	removeTokensFromStorage,
	saveToStorage
} from '@/features/services/auth/auth.helper'
import { IAuthData } from '../../../types/authData.interface'
import { getContentType } from '@/shared/lib/utils/api.utils'

const AUTH = 'auth'

export const AuthService = {
	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthData>(`/${AUTH}/login`, {
			email,
			password
		})
		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async register(email: string, password: string, userName: string) {
		const response = await axiosClassic.post<IAuthData>(`/${AUTH}/register`, {
			email,
			password,
			userName
		})
		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async logout() {
		removeTokensFromStorage()
		localStorage.removeItem('user')
		return await axiosClassic.post(`/${AUTH}/logout`)
	},

	async check() {
		const response = await axiosClassic.get<IAuthData>(`/${AUTH}/refresh`, {
			withCredentials: true,
			headers: getContentType()
		})
		if (response.data.accessToken) saveToStorage(response.data)
		return response.data
	}
}
