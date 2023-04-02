import { FC } from 'react'
import styles from './Navbar.module.scss'
import { navbarLinks } from '@/shared/ui/layout/navbar/navbar.helper'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'

const Navbar: FC = () => {
	const { asPath } = useRouter()

	return (
		<nav className={styles.navbar}>
			<div className={styles.navbar__panel}>
				<ul>
					{navbarLinks.map(link => (
						<Link href={link.href} key={link.id}>
							<a
								className={cn({
									[styles.active]: asPath === link.href
								})}
							>
								<link.icon />
								<p>{link.title}</p>
							</a>
						</Link>
					))}
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
