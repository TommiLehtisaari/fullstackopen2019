import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'
import SimpleBlog from './simpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'All about Javascript',
    author: 'Dr. Json',
    url: 'http://example.com/blog',
    likes: 16
  }

  const { container } = render(<SimpleBlog blog={blog} />)

  expect(container).toHaveTextContent('All about Javascript')
  expect(container).toHaveTextContent('Dr. Json')
  expect(container).toHaveTextContent('blog has 16 likes')
})

it('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'All about Javascript',
    author: 'Dr. Json',
    url: 'http://example.com/blog',
    likes: 16
  }

  const mockHandler = jest.fn()

  const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />)

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
