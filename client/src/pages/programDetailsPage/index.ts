export { ProgramDetailsPage } from './ui/programDetailsPage/ProgramDetailsPage'
export { useGetProgramById } from './api/programDetailsApi'
export type {
	ProgramDetails,
	ProgramDetailsSchema
} from './model/types/ProgramDetailsSchema'
export {
	programDetailsActions,
	programDetailsReducer
} from './model/slice/programDetailsSlice'
