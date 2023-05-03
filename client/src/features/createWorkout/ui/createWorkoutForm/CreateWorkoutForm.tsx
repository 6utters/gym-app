import { FC, useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, ButtonTheme, Input } from '@/shared/ui'
import UploadField from '@/shared/ui/uploadField/UploadField'
import { selectFile } from '@/shared/lib/utils/file/file.utils'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getExerciseIds } from '@/features/createWorkout/model/selectors/getExerciseIds/getExerciseIds'
import { createWorkoutFormData } from '@/features/createWorkout/model/lib/createWorkoutFormData/createWorkoutFormData'
import {
	createWorkoutActions,
	getObjectives,
	useCreateWorkout
} from '@/features/createWorkout'
import styles from './CreateWorkoutForm.module.scss'
import { ExerciseCard, useGetExercises } from '@/entities/Exercise'
import { IoAddCircle } from 'react-icons/io5'
import { WORKOUTS_ROUTE } from '@/shared/consts'
import { Objective } from '@/types/objective.interface'

interface CreateWorkoutFormProps {
	showMuscleGroups: (open: boolean) => void
	showObjectives: (exerciseId: number) => void
}

export interface FormProps {
	name: string
	image: string
	exerciseIds: number[]
	objectives: Objective[]
}

export const CreateWorkoutForm: FC<CreateWorkoutFormProps> = props => {
	const { showMuscleGroups, showObjectives } = props
	const router = useRouter()
	const dispatch = useDispatch()

	const [createWorkout] = useCreateWorkout()

	const [currentFile, setCurrentFile] = useState<File | null>(null)

	const exerciseIds = useSelector(getExerciseIds)
	const { data: exercises } = useGetExercises(exerciseIds)
	const objectives = useSelector(getObjectives)

	const clearAll = useCallback(() => {
		dispatch(createWorkoutActions.clearAll())
	}, [dispatch])

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<FormProps>({ mode: 'onBlur' })

	const onSubmit: SubmitHandler<FormProps> = async data => {
		const formData = createWorkoutFormData({
			name: data.name,
			currentFile,
			exerciseIds,
			objectives
		})
		await createWorkout(formData)
		dispatch(createWorkoutActions.clearAll())
		reset()
		await router.push(WORKOUTS_ROUTE)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<Input
				{...register('name', {
					required: 'The name of the workout is required'
				})}
				error={errors.name}
				placeholder={'Program Name'}
			/>
			<UploadField
				onChange={e => selectFile(e, setCurrentFile)}
				placeholder={'Program image'}
			/>
			<div className={styles.list_block}>
				<div className={styles.header}>
					<h3>Workout Exercises</h3>
					<Button
						className={styles.add_btn}
						type={'button'}
						theme={ButtonTheme.CLEAR}
						onClick={() => showMuscleGroups(true)}
					>
						<IoAddCircle />
					</Button>
				</div>
				<div className={styles.list}>
					{exercises?.map(ex => (
						<ExerciseCard key={ex.id} exercise={ex} onClick={showObjectives} />
					))}
				</div>
			</div>
			<div className={styles.form_buttons}>
				<Button
					className={styles.clear_btn}
					type={'button'}
					onClick={clearAll}
					disabled={exerciseIds.length == 0}
				>
					Clear
				</Button>
				<Button
					className={styles.create_program_btn}
					type={'submit'}
					disabled={exerciseIds.length == 0 || !currentFile}
				>
					Create Workout
				</Button>
			</div>
		</form>
	)
}
