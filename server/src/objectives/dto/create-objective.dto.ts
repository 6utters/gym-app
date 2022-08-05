export class CreateObjectiveDto {
	readonly userId: number
	readonly programId: number
	readonly exerciseId: number
	readonly targetSets: number
	readonly targetReps: number
	readonly timeout: number
}
