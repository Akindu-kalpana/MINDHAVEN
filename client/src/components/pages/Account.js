import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, FormControl, Select, MenuItem, Typography, Box, InputLabel } from '@mui/material';
import '../style/account.css';

export const Account = () => {
  const [showForm, setShowForm] = useState(true); // Initially show the form
  const [formData, setFormData] = useState({
    fullName: 'Akindu kalpana',
    preferredName: '',
    age: '23',
    gender: 'Male',
    primaryGoals: 'Improve mental clarity and focus',
    challenges: 'Managing work-life balance',
    areasOfInterest: 'Mindfulness and stress reduction',
    typicalDay: 'Busy with meetings and work tasks',
    sleepSchedule: '6-7 hours per night',
    workOrStudy: 'Full-time job in IT',
    stressTriggers: 'Deadlines and workload',
    mindfulnessPractice: '10 minutes of meditation daily',
    selfCareFrequency: 'Weekly',
    hobbies: 'Reading and hiking',
    progressTracking: 'Weekly progress reports',
    remindersFrequency: 'Daily',
    privacyConcerns: 'Data sharing and storage concerns',
    unwindActivities: 'Listening to music and yoga',
    learningPreferences: 'Video tutorials and hands-on practice',
    moodTracking: 'Yes, interested',
  });
  const [analysis, setAnalysis] = useState(''); // State to hold GPT analysis

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to save data to localStorage
  const saveToLocalStorage = (name, value) => {
    localStorage.setItem(name, value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to backend for analysis
      const response = await axios.post('http://localhost:8000/api/analyze-mental-state', formData);

      // Extract the analysis from the response and set it to the state
      const { analysis } = response.data;
      setAnalysis(analysis);

      // Save the analysis in localStorage
      saveToLocalStorage('gptAnalysis', response.data.analysis);

      // Hide the form after submission
      setShowForm(false);
    } catch (error) {
      console.error('Error sending data to the backend:', error);
      alert('Failed to analyze data. Please try again later.');
    }
  };

  const processAnalysis = (content) => {
    // Split the text into sections based on "####"
    const sections = content.split("####").filter((section) => section.trim() !== "");
  
    return sections.map((section, index) => {
      // Split into title and details
      const lines = section.trim().split("\n");
      let title = lines[0]; // The title of the section
      const details = lines.slice(1); // The content of the section
  
      // Check if it's a main heading (### but not starting with "Step")
      const isMainHeading = title.startsWith("###") && !title.startsWith("### Step");
      // Check if it's a subheading (### and starts with "Step")
      const isSubHeading = title.startsWith("### Step");
  
      // Remove "###" from the title
      if (isMainHeading || isSubHeading) {
        title = title.replace(/^###\s*/, "");
      }
  
      return (
        <Box key={index} sx={{ mb: 4 }}>
          {/* Render the title */}
          <Typography
            variant={isMainHeading ? "h5" : isSubHeading ? "h6" : "h6"}
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: isMainHeading
                ? "primary.main" // Main headings in primary color
                : isSubHeading
                ? "secondary.main" // Subheadings (### Step) in secondary color
                : "text.primary", // Default color for other titles
            }}
          >
            {title}
          </Typography>
          {/* Render the details */}
          {details.map((line, idx) => (
            <Typography key={idx} variant="body1" sx={{ mb: 0.5 }}>
              {formatLine(line)}
            </Typography>
          ))}
        </Box>
      );
    });
  };
  
  // Helper function to format lines
  const formatLine = (line) => {
    // Replace all occurrences of **text** with bold text
    const formattedLine = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  
    // Automatically detect and convert URLs to clickable links
    const clickableLinks = formattedLine.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
  
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: clickableLinks,
        }}
      />
    );
  };
  
  
  
  
  

  return (
    <div>
      <Typography variant="h4" className="mb-4 custom-header">
        Welcome to MindHaven
      </Typography>


      {/* Show analysis if form is submitted */}
      {!showForm && analysis && (
        <Box className="analysis-box">
          <Typography variant="h5" gutterBottom className="analysis-title">
          </Typography>
          <Box className="analysis-content">
            {processAnalysis(analysis)}
          </Box>
          <Button
            variant="outlined"
            color="primary"
            className="reset-button"
            onClick={() => setShowForm(true)}
          >
            Reset Form
          </Button>
        </Box>
      )}



      {/* Show the form if it's not submitted yet */}
      {showForm && (
        <form onSubmit={handleSubmit} className="form-container">
          <Typography variant="h5" gutterBottom>
            Basic Information
          </Typography>
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Preferred Name"
            name="preferredName"
            value={formData.preferredName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Non-Binary">Non-Binary</MenuItem>
              <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h5" gutterBottom className="section-header">
            Mental Health and Wellbeing Goals
          </Typography>
          <TextField
            label="Primary Goals"
            name="primaryGoals"
            value={formData.primaryGoals}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Challenges"
            name="challenges"
            value={formData.challenges}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Areas of Interest"
            name="areasOfInterest"
            value={formData.areasOfInterest}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <Typography variant="h5" gutterBottom className="section-header">
            Current Habits and Lifestyle
          </Typography>
          <TextField
            label="Typical Day"
            name="typicalDay"
            value={formData.typicalDay}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Sleep Schedule"
            name="sleepSchedule"
            value={formData.sleepSchedule}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Work or Study"
            name="workOrStudy"
            value={formData.workOrStudy}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Stress Triggers"
            name="stressTriggers"
            value={formData.stressTriggers}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <Typography variant="h5" gutterBottom className="section-header">
            Mindfulness and Self-Care Practices
          </Typography>
          <TextField
            label="Mindfulness Practice"
            name="mindfulnessPractice"
            value={formData.mindfulnessPractice}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Self-Care Frequency"
            name="selfCareFrequency"
            value={formData.selfCareFrequency}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Hobbies"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <Typography variant="h5" gutterBottom className="section-header">
            Feedback on Progress and Preferences
          </Typography>
          <TextField
            label="Progress Tracking Preferences"
            name="progressTracking"
            value={formData.progressTracking}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Reminders Frequency"
            name="remindersFrequency"
            value={formData.remindersFrequency}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Privacy Concerns"
            name="privacyConcerns"
            value={formData.privacyConcerns}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <Typography variant="h5" gutterBottom className="section-header">
            Optional Additional Questions
          </Typography>
          <TextField
            label="Unwind Activities"
            name="unwindActivities"
            value={formData.unwindActivities}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Learning Preferences"
            name="learningPreferences"
            value={formData.learningPreferences}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mood Tracking Interest"
            name="moodTracking"
            value={formData.moodTracking}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <Box marginTop={3}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};
