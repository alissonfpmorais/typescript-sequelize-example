import * as Sequelize from 'sequelize'
import { CommentAttributes, CommentInstance } from 'models/Comment'
import { PostAttributes, PostInstance } from 'models/Post'
import { UserAttributes, UserInstance } from 'models/User'

export type CommentModel = Sequelize.Model<CommentAttributes, CommentInstance>
export type PostModel = Sequelize.Model<PostAttributes, PostInstance>
export type UserModel = Sequelize.Model<UserAttributes, UserInstance>

export interface DbModels extends Sequelize.Models {
  Comment: Sequelize.Model<CommentAttributes, CommentInstance>
  Post: Sequelize.Model<PostAttributes, PostInstance>
  User: Sequelize.Model<UserAttributes, UserInstance>
}

export interface DbInterface {
  sequelize: Sequelize.Sequelize
  Sequelize: Sequelize.SequelizeStatic
  models: DbModels
}
