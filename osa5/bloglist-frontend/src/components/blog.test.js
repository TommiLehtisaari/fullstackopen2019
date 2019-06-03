import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Blog from './blog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'All about Javascript',
    author: 'Dr. Json',
    url: 'http://example.com/blog',
    likes: 16,
    user: {
      username: 'hellas',
      name: 'Arto Hellas',
      id: '5cf3c76a49d403de5934988e'
    },
    id: '5cf3cc63763552df3923ede6'
  }
  const mockHandler = jest.fn()

  const { container } = render(
    <Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} />
  )

  expect(container).toHaveTextContent('All about Javascript by Dr. Json')
})

it('clicking the button calls reveals rest of the info', async () => {
  const blog = {
    title: 'All about Javascript',
    author: 'Dr. Json',
    url: 'http://example.com/blog',
    likes: 16,
    user: {
      username: 'hellas',
      name: 'Arto Hellas',
      id: '5cf3c76a49d403de5934988e'
    },
    id: '5cf3cc63763552df3923ede6'
  }
  localStorage.setItem(
    'token',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlaHRvbW1pIiwibmFtZSI6IlRvbW1pIExlaHRpc2FhcmkiLCJpZCI6IjVjZjE4NjMwODRmMTAwYWM3NmQ3OGM0YSIsImlhdCI6MTU1OTMzMjQwMH0.kllIsqCddJEiwSGUgteGQvA0OeE80vAh_OuM1_g5q04'
  )

  const mockHandler = jest.fn()

  const { container } = render(
    <Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} />
  )
  fireEvent.click(container)
  const div = container.querySelector('.blog')
  fireEvent.click(div)
  expect(div).toHaveTextContent('http://example.com/blog')
  expect(div).toHaveTextContent('16 likes')
  expect(div).toHaveTextContent('added by Arto Hellas')
})
