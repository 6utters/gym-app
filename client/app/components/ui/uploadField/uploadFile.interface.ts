import { ChangeEventHandler } from 'react'
import { FieldError } from 'react-hook-form'

export interface IUploadField {
	onChange: ChangeEventHandler
	placeholder: string
	error?: FieldError
}
