import { Dispatch, SetStateAction } from 'react'

export const selectFile = (
	e: FileEvent,
	setCurrentFile: Dispatch<SetStateAction<File | null>>
) => {
	setCurrentFile(e.target.files[0])
}
