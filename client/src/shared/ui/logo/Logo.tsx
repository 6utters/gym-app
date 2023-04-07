import styles from './Logo.module.scss'
import logoSvg from '@/shared/assets/svgs/logos/app-logo.svg'
import cn from 'classnames'
import Image from 'next/image'
import { FC, memo } from 'react'

export enum LogoSize {
	'S' = 'size_s',
	'M' = 'size_m',
	'L' = 'size_l',
	'XL' = 'size_xl'
}

interface LogoProps {
	className?: string
	size?: LogoSize
}

const Logo: FC<LogoProps> = memo(({ size = LogoSize.M, className }) => {
	console.log('styles.logo', styles.logo)
	console.log('size:', size)
	console.log('styles.size_s', styles[size])

	return (
		<div
			className={cn(styles.logo, className, {
				[styles[size]]: true
			})}
		>
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
