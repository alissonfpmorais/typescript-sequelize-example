import Sequelize from 'sequelize'
import { DbModels, DbInterface } from 'typings/DbInterface'
import { CommentFactory } from './Comment'
import { PostFactory } from './Post'
import { UserFactory } from './User'

export const createModels = (sequelizeConfig: any): DbInterface => {
  const { database, username, password, params } = sequelizeConfig
  const sequelize = new Sequelize(database, username, password, params)

  const models: DbModels = {
    Comment: CommentFactory(sequelize, Sequelize),
    Post: PostFactory(sequelize, Sequelize),
    User: UserFactory(sequelize, Sequelize)
  }

  const db: DbInterface = {
    sequelize,
    Sequelize,
    models
  }

  Object.keys(db.models).forEach((modelName: keyof DbModels) => {
    const model: Sequelize.Model<any, any> = db.models[modelName]
    if (model.associate) model.associate(models)
  })

  return db
}
