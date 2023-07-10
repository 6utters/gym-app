import React, { FC, memo, useCallback, useState } from 'react'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input, UploadField } from '@/shared/ui'
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
import { ExerciseList, useGetExercises } from '@/entities/Exercise'
import { IoAdd, IoMenuOutline } from 'react-icons/io5'
import { WORKOUTS_ROUTE } from '@/shared/consts'
import { Objective } from '@/entities/Objective'
import { programCreationActions } from '@/pages/programCreationPage'
import cn from 'classnames'
import styles from './CreateWorkoutForm.module.scss'

export interface FormProps {
	name: string
	image: string
	exerciseIds: number[]
	objectives: Objective[]
}

const Addon = memo(() => (
	<div className={cn(styles.drag_icon)}>
		<IoMenuOutline />
	</div>
))

export const CreateWorkoutForm: FC = memo(() => {
	const router = useRouter()
	const dispatch = useDispatch()

	const showMuscleGroups = useCallback(() => {
		dispatch(programCreationActions.toggleMuscleGroupsPanel())
	}, [dispatch])

	const setObjective = useCallback(
		(id: number) => {
			dispatch(programCreationActions.setObjectivesExercise(id))
		},
		[dispatch]
	)

	const [createWorkout] = useCreateWorkout()

	const [workoutName, setWorkoutName] = useState('')
	const [currentFile, setCurrentFile] = useState<File | null>(null)

	const exerciseIds = useSelector(getExerciseIds)
	const objectives = useSelector(getObjectives)

	const { data: exercises } = useGetExercises(exerciseIds)

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
			<div className={styles.content}>
				<Input
					{...register('name', {
						required: 'The name of the workout is required'
					})}
					value={workoutName}
					onChange={e => setWorkoutName(e.target.value)}
					error={errors.name}
					placeholder={'Program Name'}
				/>
				<UploadField
					onChange={e => selectFile(e, setCurrentFile)}
					placeholder={'Program image'}
				/>
				{currentFile && (
					<div className={styles.onload_img_wrapper}>
						<Image
							src={currentFile ? URL.createObjectURL(currentFile) : ''}
							alt='loaded image'
							width='100'
							height='100'
							sizes={'100vh'}
						/>
						<div className={styles.dark_overlay} />
					</div>
				)}
				<div className={styles.list_block}>
					<div className={styles.header}>
						<h3>Workout Exercises</h3>
						<Button
							className={styles.add_btn}
							theme='circle'
							type={'button'}
							color={'secondary'}
							size='m'
							onClick={showMuscleGroups}
						>
							<IoAdd />
						</Button>
					</div>
					<ExerciseList
						className={styles.exercise_list}
						onItemClick={setObjective}
						onClick={showMuscleGroups}
						exercises={exercises}
						addon={<Addon />}
						isDraggable={true}
					/>
				</div>
			</div>
			<div className={styles.form_buttons}>
				<Button
					className={styles.clear_btn}
					color='secondary'
					size='m'
					fullWidth
					onClick={clearAll}
					disabled={exerciseIds.length == 0}
				>
					Clear
				</Button>
				<Button
					className={styles.create_program_btn}
					theme='outlined'
					color='secondary'
					size='m'
					fullWidth
					type={'submit'}
					disabled={exerciseIds.length == 0 || !currentFile || !workoutName}
				>
					Create Workout
				</Button>
			</div>
		</form>
	)
})
