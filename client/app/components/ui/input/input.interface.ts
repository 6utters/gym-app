import { FieldError } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

export interface IFieldProps {
	placeholder: string
	error: FieldError | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IInput extends TypeInputPropsField {}
