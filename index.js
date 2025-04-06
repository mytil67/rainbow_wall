// index.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bubbleSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  txt: String,
  col: String,
  note: String,
});
const Bubble = mongoose.model('Bubble', bubbleSchema);

app.get('/bubbles', async (req, res) => {
  const bubbles = await Bubble.find({});
  res.json(bubbles);
});

app.post('/bubbles', async (req, res) => {
  const bubble = new Bubble(req.body);
  await bubble.save();
  res.status(201).json(bubble);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
