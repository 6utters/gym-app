//TODO: take ids from user

export class CreateObjectiveDto {
	readonly userId: number
	readonly exerciseId: number
	readonly targetSets: number
	readonly targetReps: number
}
