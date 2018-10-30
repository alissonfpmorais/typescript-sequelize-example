import * as Sequelize from 'sequelize'
import { DbModels } from 'typings/DbInterface'
import { PostAttributes, PostInstance } from 'models/Post'
import { UserAttributes, UserInstance } from 'models/User'
import { SequelizeAttributes } from 'typings/SequelizeAttributes'

export interface CommentAttributes {
  id?: number
  text: string
  createdAt?: Date
  updatedAt?: Date
  post?: PostAttributes | PostAttributes['id'];
  author?: UserAttributes | UserAttributes['id'];
  upvoters?: UserAttributes[] | UserAttributes['id'][];
}

export interface CommentInstance extends Sequelize.Instance<CommentAttributes>, CommentAttributes {
  getPost: Sequelize.BelongsToGetAssociationMixin<PostInstance>;
  setPost: Sequelize.BelongsToSetAssociationMixin<PostInstance, PostInstance['id']>;
  createPost: Sequelize.BelongsToCreateAssociationMixin<PostAttributes>;

  getAuthor: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setAuthor: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
  createAuthor: Sequelize.BelongsToCreateAssociationMixin<UserAttributes>;

  getUpvoters: Sequelize.BelongsToManyGetAssociationsMixin<UserInstance>;
  setUpvoters: Sequelize.BelongsToManySetAssociationsMixin<UserInstance, UserInstance['id'], 'PostUpvotes'>;
  addUpvoters: Sequelize.BelongsToManyAddAssociationsMixin<UserInstance, UserInstance['id'], 'PostUpvotes'>;
  addUpvoter: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, UserInstance['id'], 'PostUpvotes'>;
  createUpvoters: Sequelize.BelongsToManyCreateAssociationMixin<UserAttributes, UserInstance['id'], 'PostUpvotes'>;
  removeUpvoter: Sequelize.BelongsToManyRemoveAssociationMixin<UserInstance, UserInstance['id']>;
  removeUpvoters: Sequelize.BelongsToManyRemoveAssociationsMixin<UserInstance, UserInstance['id']>;
  hasUpvoter: Sequelize.BelongsToManyHasAssociationMixin<UserInstance, UserInstance['id']>;
  hasUpvoters: Sequelize.BelongsToManyHasAssociationsMixin<UserInstance, UserInstance['id']>;
  countUpvoters: Sequelize.BelongsToManyCountAssociationsMixin;
}

export const CommentFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<CommentAttributes, CommentInstance> => {
  const attributes: SequelizeAttributes<CommentAttributes> = {
    text: {
      type: DataTypes.STRING
    }
  }

  const Comment: Sequelize.Model<CommentAttributes, CommentInstance> = sequelize.define<CommentInstance, CommentAttributes>('Comment', attributes)

  Comment.associate = (models: DbModels) => {
    Comment.belongsTo(models.Post)
    Comment.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' })
    Comment.belongsToMany(models.User, {
      as: 'upvoters',
      through: 'PostUpvotes'
    })
  }

  return Comment
}
