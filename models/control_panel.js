import { sequelize } from "./dbConnection.js";
import { Sequelize } from "sequelize";

export const control_panel = sequelize.define(
  "control_panel",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    key: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isLongEnough(value) {
          if (value.length < 5) {
            throw new Error("Password should be at least 5 characters long");
          }
        },
      },
    },
  },
  {
    timestamps: false,
    tableName: "control_panel",
  }
);
control_panel.sync();

control_panel.afterSync(async () => {
  try {
    const existingRecord = await control_panel.findOne({
      where: {
        key: "openAiKey",
      },
    });
    if (!existingRecord) {
      await control_panel.create({
        id: 1,
        key: "openAiKey",
        value: "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",
      });
    }
  } catch (error) {
    console.error("Error adding record:", error);
  }
});
