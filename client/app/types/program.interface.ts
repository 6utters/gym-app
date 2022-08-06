import { IBase } from './base.interface'
import { IExercise } from './exercise.interface'

export interface IProgram extends IBase {
	name: string
	exercises: IExercise[]
}
