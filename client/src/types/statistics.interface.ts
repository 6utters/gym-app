import { IBase } from './base.interface'
import { IUser } from './user.interface'
import { IProgram } from './program.interface'
import { IExercise } from './exercise.interface'

export interface IStatistics extends IBase {
	repetitions: number
	user: IUser
	program: IProgram
	exercise: IExercise
}