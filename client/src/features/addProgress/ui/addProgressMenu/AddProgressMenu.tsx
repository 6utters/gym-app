import { FC, useState } from 'react'
import styles from './AddProgressMenu.module.scss'
import { Button, Input } from '@/shared/ui'
import { IoAdd } from 'react-icons/io5'
import { useAddProgress } from '@/features/addProgress'

interface AddProgressMenuProps {
	exerciseId: number
	programId: number
	onAdd: () => void
}

export const AddProgressMenu: FC<AddProgressMenuProps> = props => {
	const { exerciseId, programId, onAdd } = props

	const [repetitions, setRepetitions] = useState(0)
	const [addProgress, { error, isLoading }] = useAddProgress()

	const onAddClick = () => {
		addProgress({ exerciseId, programId, repetitions })
		onAdd()
		setRepetitions(0)
	}

	return (
		<div className={styles.add_progress_menu}>
			<Input
				className={styles.progress_input}
				type={'number'}
				placeholder={'Repeats'}
				value={repetitions === 0 ? '' : repetitions}
				onChange={e => setRepetitions(+e.target.value)}
			/>
			<Button
				color='secondary'
				className={styles.progress_btn}
				onClick={onAddClick}
				disabled={repetitions === 0}
			>
				<IoAdd />
			</Button>
		</div>
	)
}
