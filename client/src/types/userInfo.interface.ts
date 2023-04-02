import { Base } from 'postcss-selector-parser'

export interface IUserInfo extends Base {
	height: number
	weight: number
	age: number
	gender: string
}
