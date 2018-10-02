const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000

const app = express()

app.use(express.static('public'))

app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}: ${req.method} ${req.url} \n`
  fs.appendFile('server.log', log, err => {
    if (err) throw err
  })

  next()
})

// app.use((req, res, next) => {
//   res.render('maintain.hbs')
// })

hbs.registerPartials('views/partials')

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('toUpperCase', text => {
  return text.toUpperCase()
})

app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to our website'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  })
})

app.get('/project', (req, res) => {
  res.render('project.hbs', {
    pageTitle: 'Project page'
  })
})

app.listen(port, () => {
  console.log(`App is listening in port ${port}`)
})
