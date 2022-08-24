import { IExercise } from './exercise.interface'

export interface IGroup {
	id: number
	name: string
	thumbnailPath: string
	exercises: IExercise[]
}
