import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import router from './server/routes/index'

const app = express()

const sess = {
  secret: 'secretWord',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 3600000,
  },
}

app.set('view engine', 'pug')
app.set('views', `${__dirname}/views`)

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session(sess))

app.use('/', router)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Todo-List App Running on localhost:3000!!!')
})