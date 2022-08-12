import {
	IoAddSharp,
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
		href: '/workouts/cr',
		icon: IoAddSharp
	},
	{ id: 3, title: 'Profile', href: '/profile', icon: IoPersonCircleOutline }
]
