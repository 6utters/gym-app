import { Objective } from '@/types/objective.interface'

interface createWorkoutFormDataParams {
	currentFile: File | null
	name: string
	exerciseIds: number[]
	objectives: Objective[]
}

export const createWorkoutFormData = ({
	currentFile,
	name,
	exerciseIds,
	objectives
}: createWorkoutFormDataParams) => {
	const formData = new FormData()
	formData.append('name', name)
	// @ts-ignore
	formData.append('image', currentFile)
	formData.append('exerciseIds', JSON.stringify(exerciseIds))
	formData.append('objectives', JSON.stringify(objectives))
	return formData
}
