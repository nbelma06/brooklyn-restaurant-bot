const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');

sendButton.addEventListener('click', () => {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage('user', userMessage);
  userInput.value = '';

  fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }]
    })
  })
  .then(response => response.json())
  .then(data => {
    const botMessage = data.choices[0].message.content;
    addMessage('bot', botMessage);
  })
  .catch(error => {
    addMessage('bot', 'Oops, something went wrong!');
    console.error(error);
  });
});

function addMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
