export interface ProgramDetails {
	id: number
	finishDate: string
}

export interface ProgramDetailsSchema {
	completedPrograms: ProgramDetails[]
	isLoading: boolean
	error?: string
}
