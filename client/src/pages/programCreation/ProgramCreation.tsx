import { FC, useState } from 'react'
import styles from './ProgramCreation.module.scss'
import Input from '@/shared/ui/input/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IProgramInput } from '@/pages/programCreation/programInput.interface'
import Button from '@/shared/ui/button/Button'
import { CSSTransition } from 'react-transition-group'
import MuscleGroupsModal from './muscleGroupsModal/MuscleGroupsModal'
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector'
import { exercisesApi } from '@/app/store/api/exercises.api'
import { IoClose } from 'react-icons/io5'
import { programSlice } from '@/app/store/program/program.slice'
import { useDispatch } from 'react-redux'
import UploadField from '@/shared/ui/uploadField/UploadField'
import { selectFile } from '@/shared/lib/utils/file/file.utils'
import { workoutsApi } from '@/app/store/api/workouts.api'
import { useRouter } from 'next/router'

const ProgramCreation: FC = () => {
	const router = useRouter()
	const ids =
		typeof window !== 'undefined' && localStorage.getItem('ex_ids')
			? JSON.parse(localStorage.getItem('ex_ids') || '')
			: []
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IProgramInput>({ mode: 'onBlur' })
	const dispatch = useDispatch()
	const [showMuscleGroups, setShowMuscleGroups] = useState(false)
	const { exerciseIds } = useTypedSelector(state => state.program)
	const { data: exercises } = exercisesApi.useGetAllQuery(exerciseIds)
	const [createWorkout] = workoutsApi.useCreateWorkoutMutation()
	const [currentFile, setCurrentFile] = useState<File | null>(null)
	const { removeExercise } = programSlice.actions

	const onSubmit: SubmitHandler<IProgramInput> = async data => {
		const formData = new FormData()
		formData.append('name', data.name)
		// @ts-ignore
		formData.append('image', currentFile)
		formData.append('exerciseIds', JSON.stringify(exerciseIds))

		await createWorkout(formData)
		localStorage.removeItem('ex_ids')
		reset()
		router.push('/workouts')
	}

	return (
		<div className={styles.wrapper}>
			<CSSTransition
				in={showMuscleGroups}
				timeout={300}
				classNames={{
					enter: styles.darken_enter,
					enterActive: styles.darken_enter_active,
					enterDone: styles.darken_enter_done,
					exit: styles.darken_exit,
					exitActive: styles.darken_exit_active,
					exitDone: styles.darken_exit_done
				}}
			>
				<div />
			</CSSTransition>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register('name', {
						required: 'The name of the workout is required'
					})}
					error={errors.name}
					placeholder={'Workout Name'}
				/>
				<UploadField
					onChange={e => selectFile(e, setCurrentFile)}
					placeholder={'Workout image'}
				/>
				<div className={styles.list}>
					<h3>Workout Exercises</h3>
					{exercises &&
						ids &&
						exercises.map(exercise => (
							<div
								className={styles.list__card}
								style={{
									backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${process.env.APP_SERVER_URL}${exercise.thumbnailPath})`
								}}
								key={exercise.id}
							>
								<IoClose
									className={styles.icon}
									onClick={() => dispatch(removeExercise(exercise.id))}
								/>
								<h2>{exercise.name}</h2>
							</div>
						))}
				</div>
				<Button
					type={'button'}
					onClick={() => setShowMuscleGroups(!showMuscleGroups)}
				>
					Add new exercise
				</Button>
				<Button className={styles.create_program} type={'submit'}>
					Create Workout
				</Button>
				<CSSTransition
					in={showMuscleGroups}
					timeout={300}
					classNames={{
						enter: styles.modal_enter,
						enterActive: styles.modal_enter_active,
						exit: styles.modal_exit,
						exitActive: styles.modal_exit_active
					}}
					unmountOnExit
				>
					<MuscleGroupsModal setShowMuscleGroups={setShowMuscleGroups} />
				</CSSTransition>
			</form>
		</div>
	)
}

export default ProgramCreation
