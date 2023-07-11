import { FC } from 'react'
import { navbarLinks } from '@/widgets/navbar/model/consts/navbarLinks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'
import styles from './Navbar.module.scss'

export const Navbar: FC = () => {
	const { asPath } = useRouter()

	return (
		<nav className={styles.navbar} data-testid={'Navbar'}>
			<div className={styles.navbar__panel}>
				<ul>
					{navbarLinks.map(link => (
						<Link
							href={link.href}
							key={link.id}
							className={cn({
								[styles.active]: asPath.startsWith(link.href)
							})}
						>
							<link.icon />
							<p>{link.title}</p>
						</Link>
					))}
				</ul>
			</div>
		</nav>
	)
}
