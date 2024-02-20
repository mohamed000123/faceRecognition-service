import { sequelize } from "./dbConnection.js";
import { Sequelize } from "sequelize";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    job: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    picture1: {
      type: Sequelize.STRING, // Assuming the picture paths are stored as strings
      allowNull: true,
    },
    picture2: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    picture3: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
User.sync();
