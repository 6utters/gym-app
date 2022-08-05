export class CreateObjectiveDto {
	readonly programId: number
	readonly exerciseId: number
	readonly targetSets: number
	readonly targetReps: number
	readonly timeout: number
}
