import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import User from './model/users.model.js';
import Feedback from './model/feedback.model.js';


dotenv.config();

connectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.route('/register').post( async (req, res) => {

  try {

    const { fingerprint, name, email, location, company, position } = req.body;

    if (!fingerprint ||!name || !email || !location || !company || !position) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if(!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)){
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // const isEmail = await User.findOne({ email:  email });
    // if (isEmail) {
    //   return res.status(400).json({ error: 'Email already exist' });
    // }

    const userData = User({
      fingerprint,
      name,
      email,
      location,
      company,
      position
    })

    const savedUser = await userData.save();

    if (savedUser) {
      return res.status(201).json({
        message: 'Register successful',
        success: true,
      });
    }

  } catch (error) {
    return res.status(500).json({ error: 'Server error!' });
  }
})

app.route('/users').get(async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Server error!' });
  }
})


app.route('/feedback').post(async (req, res) => {

  try {

    const { name, email, comment, rating } = req.body;

    if (!name || !email || !comment || !rating) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const feedbackData = {
      name,
      email,
      comment,
      rating
    }

    const savedFeedback = await Feedback.create(feedbackData);

    if (savedFeedback) {
      return res.status(201).json({
        message: 'Feedback saved successfully',
        success: true,
      });
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Server error!' });
  }
});



if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    res.send('API is running on production server...')
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running on local server...')
  })
}




const PORT = process.env.PORT || 6001;

app.listen(PORT, console.log(`server running ${process.env.NODE_ENV} mode on port ${process.env.PORT}`));