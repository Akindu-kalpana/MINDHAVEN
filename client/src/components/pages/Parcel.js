import React, { useState } from "react";
import axios from "axios";
import { AuthData } from "../../auth/AuthWrapper";
import '../style/shortner.css';

const ShipmentForm = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (userMessage.trim() === '') return;

    // Add user's message to chat
    setMessages([...messages, { type: 'user', text: userMessage }]);
    setLoading(true);

    try {
      // Send user message to the backend API
      const response = await axios.post('http://localhost:8000/api/chat', { userMessage });

      // Add bot's response to chat
      setMessages([...messages, { type: 'user', text: userMessage }, { type: 'bot', text: response.data.botReply }]);
      setUserMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...messages, { type: 'bot', text: 'Sorry, there was an error processing your message.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-bot-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}-message`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={userMessage}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ShipmentForm;
