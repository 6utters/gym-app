import { IAuthData, ITokens } from '../../../types/authData.interface'
import Cookies from 'js-cookie'

export const saveTokensToStorage = (data: ITokens) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}

export const saveToStorage = (data: IAuthData) => {
	saveTokensToStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}

export const removeTokensFromStorage = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}
