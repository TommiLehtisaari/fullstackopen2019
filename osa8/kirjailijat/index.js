const { ApolloServer, gql, PubSub } = require('apollo-server')
const { AuthenticationError, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')
const Author = require('./models/authorModel')
const Book = require('./models/bookModel')
const User = require('./models/userModel')
const Genre = require('./models/genreModel')

const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)

const MONGODB_URI = config.get('mongo_db')

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allGenres: [Genre]!
    genreById(id: String!): Genre!
    genreByValue(value: String!): Genre!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author!
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }

  type Book {
    title: String!
    author: Author!
    published: Int
    genres: [Genre]
    id: ID!
  }

  type Genre {
    value: String!
    books: [Book]
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    books: [Book]
    id: ID!
  }

  type User {
    username: String!
    favouriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: () => Book.find({}),
    allGenres: () => Genre.find({}),
    allAuthors: () => Author.find({}),
    findAuthor: (root, args) => {
      return Author.findOne({ name: args.name })
    },
    me: (root, args, { currentUser }) => {
      if (!currentUser) return null
      return currentUser
    },
    genreById: (root, args) => Genre.findById(args.id),
    genreByValue: (root, args) => Genre.findOne({ value: args.value })
  },
  Author: {
    bookCount: async root => {
      const author = await Author.findOne({ name: root.name }).populate('books')
      return author.books.length
    },
    books: async root => {
      const author = await Author.findById(root.id).populate('books')
      return author.books
    }
  },
  Genre: {
    books: async root => {
      const genre = await Genre.findById(root.id).populate('books')
      return genre.books
    }
  },
  Book: {
    author: async root => {
      const book = await Book.findById(root.id).populate('author')
      return book.author
    },
    genres: async root => {
      const book = await Book.findById(root.id).populate('genres')
      return book.genres
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('not authenticated')
      const { title, author, published, genres } = args
      const genres_found = await Promise.all(
        genres.map(async g => {
          const genre = await Genre.findOne({ value: g })
          if (!genre) return new Genre({ value: g })
          return genre
        })
      )

      let author_found = await Author.findOne({ name: author })
      if (!author_found) {
        author_found = new Author({ name: author })
        await author_found.save()
      }
      const book = new Book({
        title,
        author: author_found._id,
        published,
        genres: genres_found.map(g => g._id)
      })
      try {
        await book.save()
        author_found.books = author_found.books.concat(book._id)
        await author_found.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      Promise.all(
        genres_found.map(async g => {
          g.books = g.books.concat(book._id)
          await g.save()
        })
      )
      book.author = author_found
      book.genres = genres_found

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('not authenticateted')
      try {
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        return author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args, password: 'salainen' })
      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'salainen') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, config.get('jwt_secret')) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers['x-auth-token'] : null
    if (auth) {
      const decodedToken = jwt.verify(auth, config.get('jwt_secret'))
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
