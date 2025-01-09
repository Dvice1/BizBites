import React, { useState } from 'react';
import { askGPT } from './chatHelper';

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input) return;

    // Add user message to chat
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    // Get GPT response
    const gptResponse = await askGPT(input);
    setMessages([...newMessages, { sender: 'bot', text: gptResponse }]);

    setInput(''); // Clear input field
  };

  return (
    <div style={chatStyle}>
      <div style={chatWindowStyle}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '10px 0',
            }}
          >
            <span
              style={{
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: msg.sender === 'user' ? '#4CAF50' : '#f1f1f1',
                color: msg.sender === 'user' ? 'white' : 'black',
                display: 'inline-block',
                maxWidth: '80%',
                wordWrap: 'break-word', // Ensures text wraps
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div style={chatInputStyle}>
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '80%', padding: '10px', borderRadius: '5px' }}
        />
        <button onClick={handleSend} style={{ marginLeft: '10px', padding: '10px' }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;

// Styles
const chatStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '300px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
};

const chatWindowStyle = {
  maxHeight: '300px',
  overflowY: 'auto',
  padding: '10px',
  backgroundColor: 'white',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
};

const chatInputStyle = {
  display: 'flex',
  padding: '10px',
  backgroundColor: '#f1f1f1',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
};
