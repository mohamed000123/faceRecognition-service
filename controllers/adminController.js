// models
import { control_panel } from "../models/control_panel.js";

export const config = (req, res) => {
  try {
    const openAiKey = req.body.openAiKey;
    control_panel
      .update(
        { value: openAiKey },
        {
          where: {
            key: "openAiKey",
          },
        }
      )
      .then(() => {
        return res.status(200).json(`openAi key was updated successfully `);
      })
      .catch((e) => {
        return res.status(500).json(`something went wrong" ${e}`);
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json("internal server error");
  }
};
