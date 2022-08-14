import { FC } from 'react'
import Image from 'next/image'
import styles from './Logo.module.scss'
import logoSvg from '@/assets/svgs/app-logo.svg'

const Logo: FC<{ length: number }> = ({ length }) => {
	return (
		<div className={styles.logo}>
			<Image
				src={logoSvg}
				height={length}
				width={length}
				alt={'app-logo'}
				className={styles.logo__svg}
			/>
			<h1>Gym App</h1>
		</div>
	)
}

export default Logo
