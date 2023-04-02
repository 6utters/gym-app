import { FC } from 'react'
import styles from './Authentication.module.scss'
import { useRouter } from 'next/router'
import Logo from '../../shared/ui/logo/Logo'
import { useAuthRedirect } from '@/shared/lib/hooks/useAuthRedirect'
import { useActions } from '@/shared/lib/hooks/useActions'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthInput } from '@/pages/authentication/authInput.interface'
import AuthFields from '@/pages/authentication/AuthFields'
import Button from '@/shared/ui/button/Button'

const Authentication: FC = () => {
	useAuthRedirect()
	const { pathname } = useRouter()
	const { register, login } = useActions()
	const { isLoading } = useAuth()
	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset
	} = useForm<IAuthInput>({ mode: 'onBlur' })

	const onSubmit: SubmitHandler<IAuthInput> = data => {
		pathname === '/auth/register' ? register(data) : login(data)
		reset()
	}

	return (
		<section className={styles.wrapper}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.enter}>
					<Logo length={80} />
					<div className={styles.enter__auth}>
						<h1>
							{pathname === '/auth/register'
								? 'Create New Account'
								: 'Log In To Your Account'}
						</h1>
						<AuthFields register={registerInput} formState={formState} />
					</div>
				</div>
				<div className={styles.submit}>
					<div className={styles.policies}>
						<p>
							By clicking &apos;
							{pathname === '/auth/register' ? 'Sign up' : 'Sign in'}&apos;, you
							agree to the <span>user agreement</span> and the{' '}
							<span>privacy policy</span>.
						</p>
					</div>
					<Button type={'submit'} disabled={isLoading}>
						{pathname === '/auth/register' ? 'Sign Up' : 'Sign In'}
					</Button>
				</div>
			</form>
		</section>
	)
}

export default Authentication
