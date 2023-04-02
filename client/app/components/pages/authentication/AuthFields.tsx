import { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import Input from '@/components/ui/input/Input'
import { validEmail } from '@/utils/regex.utils'
import { useRouter } from 'next/router'

interface IAuthFields {
	register: UseFormRegister<any>
	formState: any
}

const AuthFields: FC<IAuthFields> = ({ register, formState: { errors } }) => {
	const { pathname } = useRouter()
	return (
		<>
			{pathname === '/auth/register' && (
				<Input
					{...register('userName', {
						required: 'User Name is required'
					})}
					placeholder={'User Name'}
					error={errors.userName}
					style={{ margin: '1.5em 0' }}
				/>
			)}
			<Input
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Email should be valid'
					}
				})}
				placeholder={'E-mail'}
				error={errors.email}
				style={{ margin: '1.5em 0' }}
			/>
			<Input
				{...register('password', {
					required: 'Password is required',
					minLength: {
						value: 6,
						message: 'Password should be at least 6 symbols'
					}
				})}
				placeholder={'Password'}
				error={errors.password}
				style={{ margin: '1.5em 0' }}
			/>
		</>
	)
}

export default AuthFields
