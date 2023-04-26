import { Instruction } from '@/entities/Instruction'
import { Warning } from '@/entities/Warning'
import { MuscleGroup } from '@/entities/MuscleGroup'

export interface Exercise {
	id: number
	name: string
	thumbnailPath: string
	videoPath: string
	description: string
	instructions: Instruction[]
	warnings: Warning[]
	group: MuscleGroup
}
