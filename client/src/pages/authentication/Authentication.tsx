import styles from './Authentication.module.scss'
import { AuthForm } from '@/features/authByEmail'
import { SIGN_UP_ROUTE } from '@/shared/consts'
import { useRouter } from 'next/router'
import { FC } from 'react'

const Authentication: FC = () => {
	// const dispatch = useAppDispatch()
	const { pathname } = useRouter()
	// const isLoading = useSelector(getAuthByEmailIsLoading)
	// const {
	// 	register: registerInput,
	// 	handleSubmit,
	// 	formState,
	// 	reset
	// } = useForm<IAuthInput>({ mode: 'onBlur' })
	//
	// const onSignUpSubmit: SubmitHandler<SignUpFields> =  useCallback(async data => {
	// 	const result = await dispatch(signUp(data))
	// 	reset()
	// }, [dispatch])

	return (
		<section className={styles.wrapper}>
			{/*<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>*/}
			{/*	<div className={styles.enter}>*/}
			{/*		<Logo length={80} />*/}
			{/*		<div className={styles.enter__auth}>*/}
			{/*			<h1>*/}
			{/*				{pathname === '/auth/register'*/}
			{/*					? 'Create New Account'*/}
			{/*					: 'Log In To Your Account'}*/}
			{/*			</h1>*/}
			{/*			<AuthFields register={registerInput} formState={formState} />*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*	<div className={styles.submit}>*/}
			{/*		<div className={styles.policies}>*/}
			{/*			<p>*/}
			{/*				By clicking &apos;*/}
			{/*				{pathname === '/auth/register' ? 'Sign up' : 'Sign in'}&apos;, you*/}
			{/*				agree to the <span>user agreement</span> and the{' '}*/}
			{/*				<span>privacy policy</span>.*/}
			{/*			</p>*/}
			{/*		</div>*/}
			{/*		<Button type={'submit'} disabled={isLoading}>*/}
			{/*			{pathname === '/auth/register' ? 'Sign Up' : 'Sign In'}*/}
			{/*		</Button>*/}
			{/*	</div>*/}
			{/*</form>*/}
			<AuthForm page={pathname === SIGN_UP_ROUTE ? 'sign_up' : 'sign_in'} />
		</section>
	)
}

export default Authentication
