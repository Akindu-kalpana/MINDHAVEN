import React, { useState, useEffect } from 'react';
import '../style/progress.css';
import { Checkbox, FormControlLabel, Box, Typography, Button } from '@mui/material';

export const Delivery = () => {
  const [steps, setSteps] = useState([]);
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Retrieve GPT analysis from localStorage
    const analysis = localStorage.getItem('gptAnalysis');

    if (analysis) {
      // Process the analysis into steps
      const steps = processAnalysis(analysis);
      setSteps(steps);
      // Initialize checkedSteps with all unchecked
      setCheckedSteps(new Array(steps.length).fill(false));
    }
  }, []);

  const handleCheckboxChange = (index) => {
    const newCheckedSteps = [...checkedSteps];
    newCheckedSteps[index] = !newCheckedSteps[index];
    setCheckedSteps(newCheckedSteps);
    calculateProgress(newCheckedSteps);
  };

  const processAnalysis = (content) => {
    // Updated regex to match "**Step X: [Step Description]" format
    const stepRegex = /\*\*Step (\d+):\s?([^\n]+)/g;
    let match;
    const steps = [];
    
    while ((match = stepRegex.exec(content)) !== null) {
      // Clean any surrounding markdown formatting if necessary
      const stepDescription = match[2].replace(/[*_~`]/g, '').trim();
      steps.push(`Step ${match[1]}: ${stepDescription}`);
    }
    
    return steps;
  };
  

  const calculateProgress = (checkedSteps) => {
    const totalSteps = checkedSteps.length;
    const completedSteps = checkedSteps.filter((checked) => checked).length;
    const progressPercentage = (completedSteps / totalSteps) * 100;
    setProgress(progressPercentage);
  };

  const handleSubmitProgress = () => {
    // Handle saving progress (for example, send it to a server)
    alert('Progress saved!');
  };

  return (
    <Box className="progress-tracking-container">
      <Typography variant="h4" gutterBottom>
        Progress Tracking
      </Typography>

      <Box className="steps-list">
        {steps.map((step, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={checkedSteps[index]}
                onChange={() => handleCheckboxChange(index)}
                name={step}
              />
            }
            label={step}
          />
        ))}
      </Box>

      <Box marginTop={3}>
      <Typography 
        variant="h6"
        style={{
          textAlign: 'center',  // Centers the text horizontally
          width: '100%',        // Ensures it takes up the full width of the parent container
          margin: '0 auto'      // Centering the element itself if it's within a container
        }}
      >
        You have completed {Math.round(progress)}% of your journey to well-being!
      </Typography>

        <Button variant="contained" color="primary" onClick={handleSubmitProgress}>
          Save Progress
        </Button>
      </Box>
    </Box>
  );
};
