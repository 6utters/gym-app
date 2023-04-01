import { FC } from 'react'
import styles from './Workouts.module.scss'
import { workoutsApi } from '@/store/api/workouts.api'
import { IoClose } from 'react-icons/io5'

const Workouts: FC = () => {
	const { data: workouts } = workoutsApi.useGetWorkoutsQuery()
	const [destroyWorkout] = workoutsApi.useDeleteWorkoutMutation()

	const deleteProgram = (id: number) => {
		destroyWorkout(id)
	}

	return (
		<div className={styles.container}>
			{workouts?.length ? <h1>Select a workout</h1> : ''}
			{workouts?.length ? (
				workouts.map(workout => (
					<div
						className={styles.card}
						key={workout.id}
						style={{
							backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(${
								process.env.APP_SERVER_URL + workout.image_path
							})`
						}}
					>
						<h2>{workout.name}</h2>
						<IoClose
							className={styles.icon}
							onClick={() => deleteProgram(+workout.id)}
						/>
					</div>
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
