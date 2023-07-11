import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
	test('should render button', () => {
		render(<Button>Test</Button>)
		expect(screen.getByText('Test')).toBeInTheDocument()
	})
})
