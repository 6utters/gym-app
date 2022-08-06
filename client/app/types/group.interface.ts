import { IExercise } from './exercise.interface'

export interface IGroup {
	name: string
	thumbnailPath: string
	exercises: IExercise[]
}
