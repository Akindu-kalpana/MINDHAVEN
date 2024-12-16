import mongoose from 'mongoose';

// Define Schema
const formDataSchema = new mongoose.Schema({
  fullName: String,
  preferredName: String,
  age: String,
  gender: String,
  primaryGoals: String,
  challenges: String,
  areasOfInterest: String,
  typicalDay: String,
  sleepSchedule: String,
  workOrStudy: String,
  stressTriggers: String,
  mindfulnessPractice: String,
  selfCareFrequency: String,
  hobbies: String,
  progressTracking: String,
  remindersFrequency: String,
  privacyConcerns: String,
  unwindActivities: String,
  learningPreferences: String,
  moodTracking: String,
}, { timestamps: true });

// Create Model
const FormData = mongoose.model('FormData', formDataSchema);

export default FormData;
