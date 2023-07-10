import { convertTime } from './convertTime'

describe('convertTime', () => {
	test('should convert an amount of milliseconds into string time as ("01:30")', () => {
		expect(convertTime(90000)).toBe('01:30')
	})
	test('should convert string time as ("01:30") into an amount of milliseconds', () => {
		expect(convertTime('01:30')).toBe(90000)
	})
})
