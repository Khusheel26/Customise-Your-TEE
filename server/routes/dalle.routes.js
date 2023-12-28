import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Log the received prompt
    console.log('Received Prompt:', prompt);

    // Call the OpenAI API to generate the image
    const response = await openai.createImage(prompt, {
      engine: "davinci",
      maxTokens: 200,
      temperature: 0.7,
      stop: "\n",
      frequencyPenalty: 0,
      presencePenalty: 0,
      n: 1,
      responseFormat: "url",
    });

    // Extract the generated image URL from the API response
    const image = response.data.choices[0].image;

    // Log the image URL
    console.log('Generated Image URL:', image);

    // Return the image URL in the response
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
