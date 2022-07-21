import { Model } from 'sequelize';

export default (sequelize, { STRING, INTEGER }) => {
  class User extends Model {
    // static associate() {
    // }
  }

  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: true,
      timestamps: true,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
      ],
    }
  );
  return User;
};
