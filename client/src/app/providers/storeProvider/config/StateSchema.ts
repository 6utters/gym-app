import { $rtkApi } from '@/shared/api'
import { AxiosInstance } from 'axios'
import { UserSchema } from '@/entities/User'
import { AuthByEmailSchema } from '@/features/authByEmail'
import { CreateWorkoutSchema } from '@/features/createWorkout/model/types/CreateWorkoutSchema'
import { StatisticsSchema } from '@/entities/Statisctics'
import { ProgramCreationSchema } from '@/pages/programCreationPage'
import { ProgramDetailsSchema } from '@/pages/programDetailsPage'

export interface StateSchema {
	//entities:
	user: UserSchema
	statistics: StatisticsSchema
	//features:
	authByEmail: AuthByEmailSchema
	createWorkout: CreateWorkoutSchema
	//pages:
	programCreationPage: ProgramCreationSchema
	programDetailsPage: ProgramDetailsSchema

	[$rtkApi.reducerPath]: ReturnType<typeof $rtkApi.reducer>
}

export interface ThunkExtraArg {
	api: AxiosInstance
}

export interface ThunkConfig<T> {
	rejectValue: T
	extra: ThunkExtraArg
	state: StateSchema
}
