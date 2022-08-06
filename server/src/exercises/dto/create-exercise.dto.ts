export class CreateExerciseDto {
	readonly name: string
	readonly description: string
	readonly warnings: string[]
	readonly instructions: string[]
	readonly group: string
}
