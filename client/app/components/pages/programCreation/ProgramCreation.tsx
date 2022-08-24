import { FC, useState } from 'react'
import styles from './ProgramCreation.module.scss'
import Input from '@/components/ui/input/Input'
import { useForm } from 'react-hook-form'
import { IProgramInput } from '@/pages/programCreation/programInput.interface'
import Button from '@/components/ui/button/Button'
import { CSSTransition } from 'react-transition-group'
import MuscleGroupsModal from './muscleGroupsModal/MuscleGroupsModal'

const ProgramCreation: FC = () => {
	const {
		register: registerInput,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IProgramInput>({ mode: 'onBlur' })
	const [showMuscleGroups, setShowMuscleGroups] = useState(false)
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
			<form>
				<Input
					// /*{...registerInput('name', { required: 'User Name is required' })}*/
					error={errors.name}
					placeholder={'Workout Name'}
				/>
				<Button
					type={'button'}
					onClick={() => setShowMuscleGroups(!showMuscleGroups)}
				>
					Add new exercise
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
