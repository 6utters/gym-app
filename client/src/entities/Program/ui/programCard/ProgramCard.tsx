import { FC } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { Program } from '../../model/types/Program'
import styles from './ProgramCard.module.scss'
import { SERVER_URL } from '@/shared/consts'

interface ProgramCardProps {
	program: Program
	onDelete: (id: number) => void
}

export const ProgramCard: FC<ProgramCardProps> = props => {
	const { program, onDelete } = props

	return (
		<div className={styles.card}>
			<Image
				className={styles.cover}
				src={SERVER_URL + program.image_path}
				alt={'Program Card'}
				width='100'
				height='100'
				sizes='100vw'
			/>
			<div className={styles.dark_overlay} />
			<h2 className={styles.program_name}>{program.name}</h2>
			<IoClose
				className={styles.delete_icon}
				onClick={() => onDelete(program.id)}
			/>
		</div>
	)
}
