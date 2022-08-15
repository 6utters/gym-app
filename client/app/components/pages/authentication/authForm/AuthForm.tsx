import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useActions } from '@/hooks/useActions'
import { IAuthInput } from '@/pages/authentication/authForm/authInput.interface'
import styles from '@/pages/authentication/Authentication.module.scss'
import Button from '@/components/ui/button/Button'
import { useAuth } from '@/hooks/useAuth'
import AuthFields from '@/pages/authentication/authForm/AuthFields'

const AuthForm: FC<{ type: 'register' | 'login' }> = ({ type }) => {
	const { register, login } = useActions()
	const { isLoading } = useAuth()
	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset
	} = useForm<IAuthInput>({ mode: 'onBlur' })

	const onSubmit: SubmitHandler<IAuthInput> = data => {
		type === 'register' ? register(data) : login(data)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.enter}>
				<h1>Create New Account</h1>
				<AuthFields register={registerInput} formState={formState} />
			</div>
			<div className={styles.submit}>
				<div className={styles.policies}></div>
				<Button type={'submit'} disabled={isLoading}>
					Sign Up
				</Button>
			</div>
		</form>
	)
}

export default AuthForm
