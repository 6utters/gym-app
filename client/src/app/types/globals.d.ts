type FileEvent = ChangeEvent<HTMLInputElement> & {
	target: EventTarget & { files: FileList }
}

declare type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>
	  }
	: T
