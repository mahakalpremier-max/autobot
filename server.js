const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const TOKEN = "EAAbT42ReGOIBRnu1znpdzLngMPYL3BPj7OUW2p4hklnX5xlA26TXeyR0CIuhbhAukt1LIjhoQgYbVPN18NyEdgUG01iMOCiVpISkZCgIkp0aZCOKS0ewyqaEbImeR3YhNZAjWAJhvDwQeYIU72KYzzXWpydA6PJw2qJk5YTPCfArXEGaUUpV8TNhyB3TGkJpZBpsXB5ivZAAkdzHjeI2JaSrenm3pVKL5ZCz2tHyfrBkyIURllFBLIRZCKV31no2LRXLlkZCBEWpQ72JtZAeP82wgxKhu";
const PHONE_NUMBER_ID = "1130190110176997";

app.get("/webhook", (req, res) => {
  const verify_token = "mahakal123";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === verify_token) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

app.post("/webhook", async (req, res) => {
  try {
    const message =
      req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (!message) {
      return res.sendStatus(200);
    }

    const from = message.from;
    const text = message.text?.body || "Hello";

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(Bot running on port ${PORT});
});
