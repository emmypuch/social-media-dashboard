const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware to enable CORS
app.use(cors());

require("dotenv").config();

const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

// Endpoint to fetch Twitter data
app.get("/twitter/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Twitter data:", error.message);
    res.status(500).json({ error: "Failed to fetch data from Twitter" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
