describe('Blog ', function() {
  it('front page can be opened', function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('new user can be created', function() {
    cy.contains('Register').click()
    cy.get('#username').type('mluukkai')
    cy.get('#name').type('Matti Luukkainen')
    cy.get('#password').type('salasana12')

    cy.contains('Submit').click()
    cy.contains('Logged in as Matti Luukkainen')
  })

  it('user can log out', function() {
    cy.contains('Logout').click()
    cy.contains('Log In')
  })

  it('user can log back in', function() {
    cy.contains('Log In').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salasana12')

    cy.contains('Submit').click()
    cy.contains('Logged in as Matti Luukkainen')
  })

  it('a blog can be created', function() {
    cy.contains('Blogs').click()
    cy.get('button').click()

    cy.get('#title').type('All about JavaScript testing')
    cy.get('#author').type('Dr. Json')
    cy.get('#url').type('https://example.com/blog/')

    cy.contains('Submit').click()
  })

  it('More info on click', function() {
    cy.contains('All about JavaScript testing').click()
    cy.contains('Like').click()
    cy.contains('1')
  })

  it('Comment section can be opened', function() {
    cy.contains('comments').click()
    cy.contains('All about JavaScript testing')
    cy.contains('by Dr. Json')
    cy.contains('0 comments')
    cy.contains('1 likes')
    cy.contains('posted by Matti Luukkainen')
  })

  it('Post a comment', function() {
    cy.get('#comment').type('I would recommend this blog to all developpers')
    cy.contains('Submit').click()
  })

  it('User section can be opened', function() {
    cy.contains('Users').click()
    cy.contains('mluukkai')
    cy.contains('Matti Luukkainen')
  })

  it('User details and blogs on click', function() {
    cy.contains('Go to profile').click()
    cy.contains('Matti Luukkainen has total of 1 blogs posted.')
    cy.contains('More info on:')
  })

  it('A comment is still there', function() {
    cy.contains('Blogs').click()
    cy.contains('All about JavaScript testing').click()
    cy.contains('comments').click()
    cy.contains('I would recommend this blog to all developpers')
  })
})
