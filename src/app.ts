import express from 'express'
import { Request, Response } from 'express'
import { createModels } from './models'
import { CommentInstance } from 'models/Comment';
import { PostInstance } from 'models/Post';
import { UserInstance } from 'models/User';

const PORT: number = 3000
const app: express.Application = express()
const sequelizeConfig = require('./config/sequelizeConfig.json')
const db = createModels(sequelizeConfig)

db.sequelize.sync()

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: `hello, world` })
})

app.get('/comments', (req: Request, res: Response) => {
  db.models.Comment.findAll()
    .then((comments: CommentInstance[]) => res.status(200).json({  }))
    .catch(err => res.status(500).json({ err: ['oops', err]}))
})

app.get('/posts', (req: Request, res: Response) => {
  db.models.Post.findAll()
    .then((posts: PostInstance[]) => res.status(200).json({ posts }))
    .catch(err => res.status(500).json({ err: ['oops', err]}))
})

app.get('/users', (req: Request, res: Response) => {
  db.models.User.findAll()
    .then((users: UserInstance[]) => res.status(200).json({ users }))
    .catch(err => res.status(500).json({ err: ['oops', err]}))
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
