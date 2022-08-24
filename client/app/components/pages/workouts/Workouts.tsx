import { FC } from 'react'
import styles from './Workouts.module.scss'
import { workoutsApi } from '@/store/api/workouts.api'

const image =
	'https://img.freepik.com/free-photo/beautiful-woman-leggings-bright-sweatshirt-is-smiling-posing-with-purple-mat-fitball_197531-16648.jpg?w=1060&t=st=1660731458~exp=1660732058~hmac=e41ec82485bcd38b96b0a2f9d2983dbd47f944242c0547be9bf0960a087bdf3c'

const Workouts: FC = () => {
	const { data: workouts } = workoutsApi.useGetWorkoutsQuery()
	return (
		<div className={styles.container}>
			{workouts?.length ? (
				workouts.map(workout => (
					<>
						<h1>Select a workout</h1>
						<div
							className={styles.card}
							key={workout.id}
							style={{ backgroundImage: `url(${image})` }}
						>
							<h2>{workout.name}</h2>
						</div>
					</>
				))
			) : (
				<div className={styles.wrapper}>
					<div className={styles.content}>
						<h3>Your list of workouts is empty.</h3>
						<p>Start your workout by adding a new work day.</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default Workouts
