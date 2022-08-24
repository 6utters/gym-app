import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import styles from './Card.module.scss'

interface ICardProps {
	name: string
	thumbnailPath: string
}

interface ICardProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Card: FC<ICardProps> = ({ name, thumbnailPath }) => {
	return (
		<div
			className={styles.card}
			style={{
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(${process.env.APP_SERVER_URL}${thumbnailPath})`
			}}
		>
			<h2>{name}</h2>
		</div>
	)
}

export default Card
