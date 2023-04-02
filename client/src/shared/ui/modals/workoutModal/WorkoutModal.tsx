import { FC } from 'react'
import styles from './WorkoutModal.module.scss'
import { IoArrowForwardOutline, IoClose } from 'react-icons/io5'
import { IExercise } from '../../../../types/exercise.interface'
import { IGroup } from '../../../../types/group.interface'

interface IWorkoutsProps {
	title: string
	type: string
	itemsList: IExercise[] | IGroup[] | undefined
	setModal: (show: boolean) => void
	clickHandler: (id: number, name: string) => void
}

const WorkoutModal: FC<IWorkoutsProps> = ({
	type,
	setModal,
	title,
	itemsList,
	clickHandler
}) => {
	return (
		<div className={styles.modal}>
			<div className={styles.header}>
				<button type={'button'} onClick={() => setModal(false)}>
					{type === 'muscle_group' ? (
						<IoClose className={styles.icon} />
					) : (
						<IoArrowForwardOutline className={styles.icon} />
					)}
				</button>
				<h1>{title}</h1>
				<div />
			</div>
			<div className={styles.list}>
				{itemsList &&
					itemsList.map(item => (
						<div
							onClick={() => clickHandler(item.id, item.name)}
							className={styles.list__card}
							style={{
								backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(${process.env.APP_SERVER_URL}${item.thumbnailPath})`
							}}
							key={item.id}
						>
							<h2>{item.name}</h2>
						</div>
					))}
			</div>
		</div>
	)
}

export default WorkoutModal
