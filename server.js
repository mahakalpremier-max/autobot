const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const TOKEN = "YOUR_ACCESS_TOKEN";
const PHONE_NUMBER_ID = "YOUR_PHONE_NUMBER_ID";

app.get("/webhook", (req, res) => {
  const verify_token = "mahakal123";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === verify_token) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", async (req, res) => {
  try {
    const message =
      req.body.entry[0].changes[0].value.messages[0];

    const from = message.from;
    const text = message.text.body;

    await axios.post(
      https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages,
      {
        messaging_product: "whatsapp",
        to: from,
        text: {
          body: Mahakal Bot Reply: ${text}
        }
      },
      {
        headers: {
          Authorization: Bearer ${TOKEN},
          "Content-Type": "application/json"
        }
      }
    );

    res.sendStatus(200);
  } catch (err) {
    console.log(err.response?.data || err.message);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Bot running...");
});