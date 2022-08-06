//TODO: to find out what to do with objectives and statistics

import { IWarning } from './warning.interface'
import { IInstruction } from './instruction.interface'
import { IGroup } from './group.interface'

export interface IExercise {
	name: string
	thumbnailPath: string
	videoPath: string
	description: string
	instructions: IInstruction[]
	warnings: IWarning[]
	group: IGroup
}
