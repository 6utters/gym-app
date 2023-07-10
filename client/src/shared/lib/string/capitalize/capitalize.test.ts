import { capitalize } from './capitalize'

describe('capitalize', () => {
	test('should capitalize lowercase word', () => {
		expect(capitalize('word')).toBe('Word')
	})
	test('should leave capitalized word untouched', () => {
		expect(capitalize('Word')).toBe('Word')
	})
})
