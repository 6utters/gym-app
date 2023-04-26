interface createWorkoutFormDataParams {
	currentFile: File | null
	name: string
	exerciseIds: number[]
}

export const createWorkoutFormData = ({
	currentFile,
	name,
	exerciseIds
}: createWorkoutFormDataParams) => {
	const formData = new FormData()
	formData.append('name', name)
	// @ts-ignore
	formData.append('image', currentFile)
	formData.append('exerciseIds', JSON.stringify(exerciseIds))
	return formData
}
