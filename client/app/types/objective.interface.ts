import { IBase } from './base.interface'
import { IUser } from './user.interface'
import { IExercise } from './exercise.interface'
import { IProgram } from './program.interface'

export interface IObjective extends IBase {
	targetSets: number
	targetReps: number
	timeout: number
	user: IUser
	exercise: IExercise
	program: IProgram
}
