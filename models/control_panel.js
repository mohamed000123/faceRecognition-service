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
    const openai = await control_panel.findOne({
      where: {
        key: "openAiKey",
      },
    });
    const eleven = await control_panel.findOne({
      where: {
        key: "elevenKey",
      },
    });
    const gender = await control_panel.findOne({
      where: {
        key: "readerGender",
      },
    });
    if (!openai) {
      await control_panel.create({
        id: 1,
        key: "openAiKey",
        value: "sk-kUncZaj0OctCq3fSkmJyT3BlbkFJKYZMfqwVulFX3BK",
      });
    }
    if (!eleven) {
      await control_panel.create({
        id: 2,
        key: "elevenKey",
        value: "4a83a293ddb3541c429502dd15f09",
      });
    }
    if (!gender) {
      await control_panel.create({
        id: 3,
        key: "readerGender",
        value: "male",
      });
    }
  } catch (error) {
    console.error("Error adding record:", error);
  }
});
