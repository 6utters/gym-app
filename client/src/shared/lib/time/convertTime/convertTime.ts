export function convertTime(time: number | string) {
	if (typeof time === 'number') {
		const totalSecs = time / 1000
		const mins = Math.floor(totalSecs / 60)
		const secs = totalSecs - mins * 60

		return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
	}

	const [mins, secs] = time.split(':')
	return (+mins * 60 + +secs) * 1000
}
