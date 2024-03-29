import {
	getAuthByEmailError,
	getAuthByEmailIsLoading
} from '../../model/selectors'
import {
	signIn,
	SignInFields,
	signUp,
	SignUpFields
} from '../../model/services'
import styles from './AuthForm.module.scss'
import { emailPattern, SIGN_UP_ROUTE, WORKOUTS_ROUTE } from '@/shared/consts'
import { useAppDispatch } from '@/shared/lib/hooks'
import { Button, Input } from '@/shared/ui'
import Logo from '@/shared/ui/logo/Logo'
import { useRouter } from 'next/router'
import { FC, memo, useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

type UseFormProps = SignUpFields & SignInFields

export const AuthForm: FC = memo(() => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const page = router.pathname === SIGN_UP_ROUTE ? 'sign_up' : 'sign_in'
	const isSignUpPage = page === 'sign_up'

	const error = useSelector(getAuthByEmailError)
	const isLoading = useSelector(getAuthByEmailIsLoading)

	const redirect = useCallback(
		async (status: string) => {
			if (status === 'fulfilled') await router.push(WORKOUTS_ROUTE)
		},
		[router]
	)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<UseFormProps>()

	const onSignUpSubmit: SubmitHandler<SignUpFields> = useCallback(
		async data => {
			const result = await dispatch(signUp(data))
			await redirect(result.meta.requestStatus)
		},
		[dispatch, redirect]
	)

	const onSignInSubmit: SubmitHandler<SignInFields> = useCallback(
		async data => {
			const result = await dispatch(signIn(data))
			await redirect(result.meta.requestStatus)
		},
		[dispatch, redirect]
	)

	return (
		<form
			onSubmit={handleSubmit(isSignUpPage ? onSignUpSubmit : onSignInSubmit)}
			className={styles.form}
		>
			<div className={styles.input_container}>
				<Logo />
				<div className={styles.title}>
					<h1>
						{isSignUpPage ? 'Create New Account' : 'Log In To Your Account'}
					</h1>
				</div>
				<div className={styles.inputs}>
					{isSignUpPage && (
						<Input
							{...register('userName', {
								required: 'User Name is required'
							})}
							placeholder={'User Name'}
							error={errors.userName}
							className={styles.input}
						/>
					)}
					<Input
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: emailPattern,
								message: 'Email should be valid'
							}
						})}
						type={'email'}
						placeholder={'E-mail'}
						error={errors.email}
						className={styles.input}
					/>
					<Input
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Password should be at least 6 symbols'
							}
						})}
						type='password'
						placeholder={'Password'}
						error={errors.password}
						className={styles.input}
					/>
				</div>
				{error && <div className={styles.error}>{error}</div>}
			</div>
			<div className={styles.submit_container}>
				<div className={styles.policies}>
					<p>
						By clicking &apos;
						{isSignUpPage ? 'Sign up' : 'Sign in'}&apos;, you agree to the{' '}
						<span>user agreement</span> and the <span>privacy policy</span>.
					</p>
				</div>
				<Button
					size='m'
					theme='outlined'
					fullWidth
					type={'submit'}
					disabled={isLoading}
				>
					{isSignUpPage ? 'Sign Up' : 'Sign In'}
				</Button>
			</div>
		</form>
	)
})
