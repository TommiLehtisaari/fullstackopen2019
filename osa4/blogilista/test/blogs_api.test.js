const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const { Blog } = require('../models/blogModel')
const test_data = require('./testdata_blogposts')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = test_data.data.map(post => new Blog(post))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are right amount of blogs returned', async () => {
    const result = await api.get('/api/blogs').expect(200)
    expect(result.body.length).toBe(7)
  })

  test('instance of returned array includes right properties', async () => {
    const result = await api.get('/api/blogs').expect(200)
    const blogpost = result.body[0]
    // method toBeDefined was not working used toHaveProperty instead
    expect(blogpost).toHaveProperty('id')
    expect(blogpost).toHaveProperty('author')
    expect(blogpost).toHaveProperty('title')
    expect(blogpost).toHaveProperty('url')
    expect(blogpost).not.toHaveProperty('_id')
    expect(blogpost).not.toHaveProperty('__v')
  })
})

describe('POST request of blogs', () => {
  test('property of likes gets default value of (zero) if not defined', async () => {
    const result = await api
      .post('/api/blogs')
      .send({ title: 'test', author: 'test', url: 'https://test.com/blog/vol_1' })
      .expect(201)

    expect(result.body.likes).toBe(0)
  })

  test('status of 400 if property "url" is missing', async () => {
    await api
      .post('/api/blogs')
      .send({ title: 'test', author: 'test' })
      .expect(400)
  })

  test('status of 400 if property "title" is missing', async () => {
    await api
      .post('/api/blogs')
      .send({ author: 'test', url: 'http://test.com/blog' })
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
