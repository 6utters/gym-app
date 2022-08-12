import { FC } from 'react'
import styles from './Navbar.module.scss'
import { navbarLinks } from '@/components/layout/navbar/navbar.helper'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar: FC = () => {
	const { asPath } = useRouter()

	return (
		<nav className={styles.navbar}>
			<ul>
				{navbarLinks.map(link => (
					<Link href={link.href} key={link.id}>
						<a>
							<link.icon />
							<p>{link.title}</p>
						</a>
					</Link>
				))}
			</ul>
		</nav>
	)
}

export default Navbar
