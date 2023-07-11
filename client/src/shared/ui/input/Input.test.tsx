import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
	test('should allow user to type', () => {
		render(<Input />)
		const input = screen.getByTestId('Input.input')
		fireEvent.input(input, { target: { value: 'some random text' } })
		expect(input).toHaveValue('some random text')
	})
	test('should render input with error', () => {
		const error = {
			type: 'required',
			message: 'The text of the workout is required'
		}
		render(<Input error={error} />)
		const err = screen.getByTestId('Input.error')
		expect(err).toBeInTheDocument()
		expect(err).toHaveTextContent('The text of the workout is required')
		expect(screen.getByTestId('Input.input')).toBeInTheDocument()
	})
})
