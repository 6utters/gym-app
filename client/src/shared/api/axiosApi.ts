import axios from 'axios'
import { errorCatch, getContentType } from '@/shared/lib/utils/api.utils'
import Cookies from 'js-cookie'
import { AuthService } from '@/features/services/auth/auth.service'
import { removeTokensFromStorage } from '@/features/services/auth/auth.helper'

export const API_URL = `${process.env.APP_SERVER_URL}/api`

export const $apiClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})

export const $api = axios.create({
	baseURL: API_URL,
	headers: getContentType(),
	withCredentials: true
})

$api.interceptors.request.use(config => {
	const accessToken = Cookies.get('accessToken')
	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

$api.interceptors.request.use(
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
				return $api.request(originalRequest)
			} catch (e) {
				if (errorCatch(e) === 'jwt expired') removeTokensFromStorage()
			}
		}

		throw error
	}
)
