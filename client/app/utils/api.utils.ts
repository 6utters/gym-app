export const errorCatch = (err: any): string =>
	err.response && err.response.data
		? typeof err.response.data.message === 'object'
			? err.response.data.message[0]
			: err.response.data.message
		: err.mesage
