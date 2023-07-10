import { mergeSeoTitle } from './mergeSeoTitle'
import { APP_NAME } from '@/shared/consts'

describe('mergeSeoTitle', () => {
	test('should merge', () => {
		expect(mergeSeoTitle('Some title')).toEqual(`${APP_NAME} | Some title`)
	})
})
