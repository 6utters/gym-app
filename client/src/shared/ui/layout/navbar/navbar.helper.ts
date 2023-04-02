import {
	IoAddCircleOutline,
	IoBarbellSharp,
	IoPersonCircleOutline
} from 'react-icons/io5'
import { IconType } from 'react-icons'

interface INavbarLink {
	id: number
	title: string
	href: string
	icon: IconType
}

export const navbarLinks: INavbarLink[] = [
	{ id: 1, title: 'Workouts', href: '/workouts', icon: IoBarbellSharp },
	{
		id: 2,
		title: 'Create',
		href: '/workouts/pr-cr',
		icon: IoAddCircleOutline
	},
	{ id: 3, title: 'Profile', href: '/profile', icon: IoPersonCircleOutline }
]
