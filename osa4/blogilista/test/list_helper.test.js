const listHelper = require('../utils/list_helper')

const listWithManyBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5ceece6f888091687a07572c',
    title: 'Essential Customizations for VSCode',
    author: 'Jeffrey Zhen',
    url: 'https://blog.echobind.com/essential-customizations-for-vscode-ff4c5e3889d7',
    likes: 3,
    __v: 0
  },
  {
    _id: '5ceec890ffe11b66f3dcb5dd',
    title: 'Integrating Prettier + ESLint + Airbnb Style Guide in VSCode',
    author: 'Jeffrey Zhen',
    url:
      'https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a',
    likes: 35,
    __v: 0
  },
  {
    _id: '5ceff8517015837e9cbd9854',
    title: 'The new ECMAScript module support in Node.js 12',
    author: 'Dr. Axel Rauschmayer',
    url: 'http://2ality.com/2019/04/nodejs-esm-impl.html',
    likes: 8,
    __v: 0
  },
  {
    _id: '5ceff8827015837e9cbd9855',
    title: 'ES proposal: Well-formed JSON.stringify',
    author: 'Dr. Axel Rauschmayer',
    url: 'http://2ality.com/2019/01/well-formed-stringify.html',
    likes: 19,
    __v: 0
  },
  {
    _id: '5ceff8a57015837e9cbd9856',
    title: 'Creating and filling Arrays of arbitrary lengths in JavaScript',
    author: 'Dr. Axel Rauschmayer',
    url: 'http://2ality.com/2018/12/creating-arrays.html',
    likes: 11,
    __v: 0
  },
  {
    _id: '5ceff8ce7015837e9cbd9857',
    title: 'ECMAScript modules in Node.js: the new plan',
    author: 'Dr. Axel Rauschmayer',
    url: 'http://2ality.com/2018/12/nodejs-esm-phases.html',
    likes: 1,
    __v: 0
  },
  {
    _id: '5ceffbd61008cf801d3b6b85',
    title: 'How to Write Functional Tests in React (Part 1)',
    author: 'Jeffrey Zhen',
    url:
      'https://blog.echobind.com/writing-functional-tests-with-react-testing-library-part-1-470870ee1a6',
    likes: 17,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is (zero)', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of bigger listis calculatedright', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(99)
  })
})

describe('sorting blogs by', () => {
  test('favourite blog', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual({
      title: 'Integrating Prettier + ESLint + Airbnb Style Guide in VSCode',
      author: 'Jeffrey Zhen',
      likes: 35
    })
  })

  test('most blogs by author', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    expect(result).toEqual({ author: 'Dr. Axel Rauschmayer', blogs: 4 })
  })

  test('most liked blogger', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    expect(result).toEqual({ author: 'Jeffrey Zhen', likes: 55 })
  })
})
