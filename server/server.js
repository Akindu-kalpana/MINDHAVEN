import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './schema/User.js';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import FormData from './schema/formDataSchema.js';
import pkg from 'uuid';
const { v4: uuidv4 } = pkg;

import axios from 'axios';  

dotenv.config();

var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});


// Passport Local Strategy for authentication
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return done(null, false, { message: 'Incorrect password' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});



// Login endpoint using Passport
app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      // User not found or incorrect email/password
      return res.status(400).json({ error: info.message });
    }

    const userEmail = user.email;

    const accessToken = jwt.sign({ email: userEmail }, process.env.JWT_SECRET);

    // console.log('Token:', accessToken);


    // Send success message
    return res.status(200).json({ accessToken: accessToken });
  })(req, res, next);
});


// Logout endpoint
app.post('/api/logout', (req, res) => {
  // Clear isLogged from the session upon logout
  req.logout(); // Optional: If you are using passport, you can also call req.logout() to remove the user from the session
  // Send success message
  res.status(200).json({ message: 'Logout successful' });
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ userName, email, password: hashedPassword }); // Save the hashed password
    await newUser.save();

    // Send success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    // Send internal server error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Define an endpoint to fetch user data from the database
app.get('/api/userData/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Fetch tracking records where senderEmail or receiverEmail matches the provided email
    const trackingRecords = await Tracking.find({
      $or: [{ senderEmail: email }, { receiverEmail: email }]
    });

    if (trackingRecords.length === 0) {
      return res.status(404).json({ message: 'No tracking records found for this email' });
    }

    // Extract parcel IDs from the tracking records
    const parcelIds = trackingRecords.map(record => record.parcelId);

    // Fetch shipment records based on parcel IDs
    const shipmentRecords = await Shipment.find({ parcelId: { $in: parcelIds } });

    // Combine tracking records with corresponding shipment details
    const results = trackingRecords.map(record => {
      const shipmentDetail = shipmentRecords.find(shipment => shipment.parcelId === record.parcelId);
      return {
        ...record.toObject(), // Spread the tracking record
        ...shipmentDetail.toObject() // Spread the shipment detail if exists
      };
    });

    res.json(results);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define an endpoint to delete a user account
app.delete('/api/deleteAccount/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Delete all shipments associated with the email
    // await Shipment.deleteMany({ senderEmail: email });

    // Delete all tracking records associated with the email
    // await Tracking.deleteMany({ senderEmail: email });

    // Delete the user account
    await User.deleteOne({ email });

    // Optionally, handle any other necessary clean-up operations

    res.status(200).json({ message: 'Account and associated records deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




///////////////////////// Locker 














///////////////////// NEW ENDPOINT //////////////////////

// Endpoint to handle saving form data
app.post("/api/formData", async (req, res) => {
  try {
    const formData = new FormData(req.body);  // Assuming FormData is your mongoose model
    await formData.save();  // Save the form data to your database
    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Failed to save form data", error });
  }
});

// Endpoint to analyze mental state based on form data
app.post('/api/analyze-mental-state', async (req, res) => {
  try {
    // Get the form data from the request body
    const formData = req.body;

    // Construct the prompt for OpenAI
    const prompt = `
    You are an expert mental wellness coach with a deep understanding of human psychology and mental health improvement strategies. A user has provided detailed responses about their daily habits, challenges, and preferences. Your task is to analyze their responses, identify potential mental health concerns, and recommend a tailored step-by-step action plan based on their input.

    Consider the following activities from the application for your recommendations:

    1.Yoga and Meditation Videos: Relaxing yoga sessions, mindfulness practices, and guided meditations to reduce stress and promote emotional well-being.
    2.Relaxation Games: Suggest calming games such as Calm Colors, Monument Valley, Zen Koi, Prune, or Flow Free to help the user unwind.
    3.Music Therapy: Recommend Spotify playlists like Peaceful Piano, Calm Vibes, Deep Focus, or Stress Relief and YouTube channels like Soothing Relaxation or Yellow Brick Cinema to improve mood and reduce stress.
    4.Nature and Ambient Sounds: Suggest relaxing white noise, nature sounds, and ambient worlds to improve focus or help with sleep.
    
    Use the provided data to craft a personalized and actionable plan that helps the user manage stress, build resilience, and enhance their mental well-being. Provide feedback on areas the user should focus on and assign a progression plan that builds healthy habits over time. Include steps for immediate actions and long-term strategies.

    User Responses:
    1. Full Name: ${formData.fullName}
    2. Preferred Name: ${formData.preferredName}
    3. Age: ${formData.age}
    4. Gender: ${formData.gender}
    5. Primary Goals: ${formData.primaryGoals}
    6. Challenges: ${formData.challenges}
    7. Areas of Interest: ${formData.areasOfInterest}
    8. Typical Day: ${formData.typicalDay}
    9. Sleep Schedule: ${formData.sleepSchedule}
    10. Work or Study: ${formData.workOrStudy}
    11. Stress Triggers: ${formData.stressTriggers}
    12. Mindfulness Practice: ${formData.mindfulnessPractice}
    13. Self-Care Frequency: ${formData.selfCareFrequency}
    14. Hobbies: ${formData.hobbies}
    15. Progress Tracking Preferences: ${formData.progressTracking}
    16. Reminders Frequency: ${formData.remindersFrequency}
    17. Privacy Concerns: ${formData.privacyConcerns}
    18. Unwind Activities: ${formData.unwindActivities}
    19. Learning Preferences: ${formData.learningPreferences}
    20. Mood Tracking Interest: ${formData.moodTracking}

    Based on the user’s responses, analyze their mental state and create a structured plan, clearly labeling Step 1, Step 2, and so on. Each step should include specific activities from the application, links to resources, and brief explanations on how these actions will benefit their mental health. But the first need to analysis the user mental stage level and give what level they can have if the followed the app recommandations.
    `;

    // Combine system instructions with user input
    const inputMessages = [
      { role: 'system', content: 'You are a helpful assistant analyzing mental health data. Please dont use any things that outside my application features. All the recommandations should be things in my app. This is a must' },
      { role: 'user', content: prompt },
    ];

    // Send the request to the OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: inputMessages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API request failed with status ${response.status}`);
    }

    // Parse the response
    const data = await response.json();
    const analysis = data.choices[0].message.content.trim();

    // Save the form data to the database
    const formDataModel = new FormData(formData);
    await formDataModel.save(); // Save the form data to the database

    // Return both saved form data and the analysis
    res.json({
      message: 'Form data saved and analysis generated successfully!',
      formData: formDataModel,
      analysis: analysis,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// gpt-3.5-turbo


// Endpoint for AI bot interactions
app.post('/api/chat', async (req, res) => {
  try {
    const { userMessage } = req.body; // Extract the user's message from the request body

    // Construct the prompt for OpenAI
    const prompt = `
    You are a helpful AI assistant. The user will ask questions related to well-being and mental health.
    Answer based on the following application features and always provide resources related to the app.
    User message: ${userMessage}
    `;

    // Prepare the input messages for the GPT model
    const inputMessages = [
      { role: 'system', content: 'You are a helpful assistant in mental wellness and well-being.' },
      { role: 'user', content: prompt },
    ];

    // Call the OpenAI API to get a response
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // You can use a different model like gpt-3.5 if preferred
        messages: inputMessages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const botReply = data.choices[0].message.content.trim(); // Extract bot's response from OpenAI API

    // Send back the response from the AI to the frontend
    res.json({
      success: true,
      message: 'AI reply generated successfully.',
      botReply: botReply, // Send the actual reply from the bot
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


















































app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});








