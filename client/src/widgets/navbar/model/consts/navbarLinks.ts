import {
	IoAddCircleOutline,
	IoBarbellSharp,
	IoPersonCircleOutline
} from 'react-icons/io5'
import { IconType } from 'react-icons'
import {
	CREATE_WORKOUT_ROUTE,
	PROFILE_ROUTE,
	WORKOUTS_ROUTE
} from '@/shared/consts'

interface INavbarLink {
	id: number
	title: string
	href: string
	icon: IconType
}

export const navbarLinks: INavbarLink[] = [
	{ id: 1, title: 'Workouts', href: WORKOUTS_ROUTE, icon: IoBarbellSharp },
	{
		id: 2,
		title: 'Create',
		href: CREATE_WORKOUT_ROUTE,
		icon: IoAddCircleOutline
	},
	{ id: 3, title: 'Profile', href: PROFILE_ROUTE, icon: IoPersonCircleOutline }
]
