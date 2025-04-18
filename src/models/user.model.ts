import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from "sequelize";
//import type { Post } from './post.model';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare phone: string;
  declare password: string;
  declare is_verified: boolean;
  declare is_active: boolean;
  declare role: "admin" | "user";

  // // association placeholder
  // static associate(models: { Post: typeof Post }) {
  //   User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
  // }
}

export function initUser(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(128), allowNull: false },
      email: { type: DataTypes.STRING(128), allowNull: false, unique: true },
      phone: { type: DataTypes.STRING(128), allowNull: false},
      password: { type: DataTypes.STRING(128), allowNull: false },
      is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
        allowNull: false,
      },
    },
    { tableName: "users", sequelize, timestamps: true }
  );
  return User;
}
