import { filterText } from './filterText'

const randomText =
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

describe('filterText', () => {
	test('should cut the string by limit', () => {
		expect(filterText(randomText, 10)).toBe('Lorem Ipsu...')
	})
	test('should leave untouched with a short text and high limit', () => {
		expect(filterText('short text', 50)).toBe('short text')
	})
	test('should leave untouched without provided limit', () => {
		expect(filterText(randomText)).toBe(randomText)
	})
})
