import { screen } from '@testing-library/react'
import { Navbar } from './Navbar'
import { renderComponent } from '@/shared/lib/tests/renderComponent/renderComponent'

jest.mock('next/router', () => ({
	useRouter() {
		return {
			route: '/',
			pathname: '',
			query: '',
			asPath: '',
			push: jest.fn(),
			events: {
				on: jest.fn(),
				off: jest.fn()
			},
			beforePopState: jest.fn(() => null),
			prefetch: jest.fn(() => null)
		}
	}
}))

describe('Navbar', () => {
	test('should render navbar', () => {
		renderComponent(<Navbar />)
		expect(screen.getByTestId('Navbar')).toBeInTheDocument()
	})
})
