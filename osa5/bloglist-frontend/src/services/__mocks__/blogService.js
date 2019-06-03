const blogs = {
  data: [
    {
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
    },
    {
      title: 'Front end with React',
      author: 'Facebook',
      url: 'http://example.com/blog',
      likes: 17,
      user: {
        username: 'hellas',
        name: 'Arto Hellas',
        id: '5cf3c76a49d403de5934988e'
      },
      id: '5cf3cdd8085999df69386950'
    }
  ]
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
