import { FC } from 'react'
import styles from './Header.module.scss'

//TODO: to show heading based on route path or smth

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<h1 className={styles.header__heading}>Workouts</h1>
		</header>
	)
}

export default Header
