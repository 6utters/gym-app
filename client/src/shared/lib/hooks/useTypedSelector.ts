import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { TypedRootState } from '@/app/store/store'

export const useTypedSelector: TypedUseSelectorHook<TypedRootState> =
	useSelector
