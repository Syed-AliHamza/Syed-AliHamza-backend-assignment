import { Model } from 'sequelize';

export default (sequelize, { STRING, INTEGER }) => {
  class Task extends Model {}

  Task.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      name: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Task',
      timestamps: true,
    }
  );
  return Task;
};
