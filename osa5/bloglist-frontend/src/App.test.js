import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
jest.mock('./services/blogService')
import App from './App'

afterAll(cleanup)

describe('<App />', () => {
  it('if no user logged, notes are not rendered', async () => {
    const component = render(<App />)
    // expectations here
    expect(component.container).toHaveTextContent('Log in to application')
  })

  it('if user is logged show blogs', async () => {
    window.localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlaHRvbW1pIiwibmFtZSI6IlRvbW1pIExlaHRpc2FhcmkiLCJpZCI6IjVjZjE4NjMwODRmMTAwYWM3NmQ3OGM0YSIsImlhdCI6MTU1OTMzMjQwMH0.kllIsqCddJEiwSGUgteGQvA0OeE80vAh_OuM1_g5q04'
    )
    const component = render(<App />)
    expect(component.container).toHaveTextContent('Blogs')
    expect(component.container).toHaveTextContent('Tommi Lehtisaari logged in')
  })
})
