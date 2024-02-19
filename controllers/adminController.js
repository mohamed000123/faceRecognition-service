// models
import { control_panel } from "../models/control_panel.js";

export const config = (req, res) => {
  try {
    const { eleven, openai, gender } = req.query;
    if (openai) {
      control_panel.update(
        { value: openai },
        {
          where: {
            key: "openAiKey",
          },
        }
      );
    }
    if (eleven) {
      control_panel.update(
        { value: eleven },
        {
          where: {
            key: "elevenKey",
          },
        }
      );
    }
    if (gender) {
      control_panel.update(
        { value: gender },
        {
          where: {
            key: "readerGender",
          },
        }
      );
    }
    res
      .status(200)
      .json({ message: "data was saved successfully", success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
};

export const elevenConfig = async (req, res) => {
  try {
    const elevenKey = await control_panel.findOne({
      attributes: ["value"],
      where: {
        key: "elevenKey",
      },
    });
    const readerGender = await control_panel.findOne({
      attributes: ["value"],
      where: {
        key: "readerGender",
      },
    });
    res
      .status(200)
      .json({ elevenKey: elevenKey.value, readerGender: readerGender.value });
  } catch (e) {
    res.status(500).json("internal server error");
  }
};
