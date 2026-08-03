import Subscriber from '../models/Subscriber.js';

export const subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({ message: "You're already subscribed." });
    }
    await Subscriber.create({ email });
    res.status(201).json({ message: "You're on the list — welcome in." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};