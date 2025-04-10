import { bot } from '../bot.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await bot.handleUpdate(req.body);
      res.status(200).send('OK');
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.status(500).send('Error processing webhook');
    }
  } else {
    res.status(405).send('Method not allowed');
  }
} 