import axios from 'axios'
import { errorCatch, getContentType } from '@/shared/lib/utils/api.utils'
import Cookies from 'js-cookie'
import { AuthService } from '@/features/services/auth/auth.service'
import { removeTokensFromStorage } from '@/features/services/auth/auth.helper'

export const API_URL = `${process.env.APP_SERVER_URL}/api`

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})

export const instance = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})

instance.interceptors.request.use(config => {
	const accessToken = Cookies.get('accessToken')
	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

instance.interceptors.request.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.check()
				return instance.request(originalRequest)
			} catch (e) {
				if (errorCatch(e) === 'jwt expired') removeTokensFromStorage()
			}
		}

		throw error
	}
)

export default instance
