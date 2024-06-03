import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMessage = { sender: 'User', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await response.json();
    const aiMessage = { sender: 'AI', text: data.response };
    setMessages([...messages, userMessage, aiMessage]);
  };

  return (
    <div>
      <div id="chatbox" style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: msg.sender === 'User' ? '#007bff' : '#eee', color: msg.sender === 'User' ? '#fff' : '#333', borderRadius: '5px' }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} style={{ width: '80%', padding: '10px' }} placeholder="Type a message..." />
      <button onClick={sendMessage} style={{ padding: '10px' }}>Send</button>
    </div>
  );
}
