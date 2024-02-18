import { ChatGPTAPI } from "chatgpt";
import twilio from "twilio";
// models
import { control_panel } from "../models/control_panel.js";
import { sequelize } from "../models/dbConnection.js";
import { Sequelize } from "sequelize";
// env variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
// getting openai key
let apiKey;
(async function () {
  const result = await sequelize.query(
    'SELECT table_name FROM information_schema.tables WHERE table_schema = "shutter" AND table_name = "control_panel"',
    {
      type: Sequelize.QueryTypes.SELECT,
    }
  );
  if (result.length > 0) {
    await control_panel
      .findOne({
        where: {
          key: "openAiKey",
        },
      })
      .then((data) => {
        apiKey = data.value;
      })
      .catch((e) => {
        console.log(e);
      });
  }
})();

export const userGreeting = async (req, res) => {
  try {
    const { userName, userJob } = req.body;

    const api = new ChatGPTAPI({
      apiKey: apiKey,
    });
    const chatgptResponse = await api.sendMessage(
      `${userJob} انه يعمل ك ,${userName}  قل مرحبا ل  `
    );
    res.status(200).json(chatgptResponse.text);
    // res.status(200).json("hello mohamed amin, how are you doing today");
  } catch (err) {
    console.log(`error sending to chatGpt", ${err}`);
    res.status(500).json(err);
  }
};

export const twilioReceive = async (req, res) => {
  const from = req.body.From;
  const message = req.body.Body;
  const api = new ChatGPTAPI({
    apiKey: apiKey,
  });
  const chatgptResponse = await api.sendMessage(message);
  const reply = chatgptResponse.text;
  client.messages.create({
    from: "whatsapp:+14155238886", // Twilio sandbox number
    body: reply,
    // to: from,
    to: from,
  });
  res.json(`message was received and  replied was sent successfully`);
};

export const twilioSend = async (req, res) => {
  const message = req.body.message;
  client.messages
    .create({
      from: "whatsapp:+14155238886", // Twilio sandbox number
      body: message,
      to: "whatsapp:+201092931340",
    })
    .then(() => {
      console.log(`message sent to user successfully.`);
      res.json({ status: "Message has been sent!" });
    })
    .catch((error) => {
      console.log(`Error sending message to user: ${error.message}`);
      res.status(400).send(`Unable to send message: ${error.message}`);
    });
};

export const gptChat = async (req, res) => {
  try {
    const message = req.body.message;
    const api = new ChatGPTAPI({
      apiKey: apiKey,
    });
    const question = `
        اجب فقط فى عشر كلمات لاغير
        ${message}`;
    const chatgptResponse = await api.sendMessage(question);
    res.status(200).json(chatgptResponse.text);
    // res.status(200).json(message + message);
  } catch (err) {
    console.log(`error sending to chatGpt", ${err}`);
    res.status(500).json(err);
  }
};
