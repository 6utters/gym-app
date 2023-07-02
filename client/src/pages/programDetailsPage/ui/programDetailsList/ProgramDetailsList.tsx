import { FC, memo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { IoChevronForwardSharp } from 'react-icons/io5'
import { WORKOUTS_ROUTE } from '@/shared/consts'
import { Program } from '@/entities/Program'
import { ExerciseList } from '@/entities/Exercise'
import styles from './ProgramDetailsList.module.scss'

interface ProgramDetailsListProps {
	program: Program
}

const Addon = memo(() => (
	<div className={styles.forward_icon}>
		<IoChevronForwardSharp />
	</div>
))

export const ProgramDetailsList: FC<ProgramDetailsListProps> = memo(props => {
	const { program } = props
	const router = useRouter()

	const onExerciseClick = useCallback(
		(id: number) => {
			router.push(`${WORKOUTS_ROUTE}/${program.id}/ex/${id}`)
		},
		[program.id, router]
	)

	return (
		<ExerciseList
			className={styles.program_details_list}
			exercises={program.exercises}
			onItemClick={onExerciseClick}
			addon={<Addon />}
		/>
	)
})
