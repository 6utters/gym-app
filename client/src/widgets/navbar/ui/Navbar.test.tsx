import { screen } from '@testing-library/react'
import { Navbar } from './Navbar'
import { renderComponent } from '@/shared/lib/tests/renderComponent/renderComponent'

jest.mock('next/router', () => ({
	useRouter: jest.fn(() => ({ asPath: '' }))
}))

describe('Navbar', () => {
	test('should render navbar', () => {
		renderComponent(<Navbar />)
		expect(screen.getByTestId('Navbar')).toBeInTheDocument()
	})
})
