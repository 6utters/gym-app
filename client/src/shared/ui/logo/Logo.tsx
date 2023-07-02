import styles from './Logo.module.scss'
import logoSvg from '@/shared/assets/svgs/logos/app-logo.svg'
import cn from 'classnames'
import Image from 'next/image'
import { FC, memo } from 'react'

export type LogoSize = 's' | 'm' | 'l' | 'xl'

interface LogoProps {
	className?: string
	size?: LogoSize
}

const Logo: FC<LogoProps> = memo(props => {
	const { size = 'm', className } = props
	return (
		<div className={cn(styles.logo_wrapper, className, styles[size])}>
			<Image
				sizes='100vw'
				src={logoSvg}
				height='100'
				width='100'
				alt={'src-logo'}
			/>
			<h1>Gym App</h1>
		</div>
	)
})

export default Logo
