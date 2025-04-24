
(function () {
  const chatbotHTML = `
    <style>
      #chatbot-window {
        width: 100%;
        max-width: 500px;
        margin: 1rem auto;
        background: white;
        border: 1px solid #ccc;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        overflow: hidden;
        font-family: Arial, sans-serif;
      }
      #chatbot-messages {
        padding: 1rem;
        height: 320px;
        overflow-y: auto;
        font-size: 0.95rem;
      }
      .chatbot-input {
        border-top: 1px solid #ccc;
        display: flex;
      }
      .chatbot-input input {
        flex: 1;
        padding: 0.6rem;
        border: none;
      }
      .chatbot-input button {
        background: #00529B;
        color: white;
        padding: 0.6rem 1rem;
        border: none;
        cursor: pointer;
      }
      .message {
        margin-bottom: 0.8rem;
      }
      .bot { color: #00529B; }
      .user { text-align: right; }
    </style>
    <div id="chatbot-window">
      <div id="chatbot-messages"></div>
      <div class="chatbot-input">
        <input type="text" id="chatbot-input" placeholder="Type your answer...">
        <button onclick="handleInput()">Send</button>
      </div>
    </div>
  `;

  const target = document.querySelector("h1");
  if (target) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = chatbotHTML;
    target.parentNode.insertBefore(wrapper, target.nextSibling);
  }

  const script = document.createElement("script");
  script.innerHTML = `
    document.addEventListener('DOMContentLoaded', function () {
      const messages = document.getElementById('chatbot-messages');
      const input = document.getElementById('chatbot-input');

      let step = 0;
      const responses = [];

      const questions = [
        "Hi there! 👋 Let’s check if you qualify. What’s your ZIP code?",
        "Great — and how old are you?",
        "What’s your estimated yearly household income?",
        "Do you currently have health insurance? (Yes/No)",
        "Thanks! Based on your answers, you may qualify. Tap below to speak with a licensed agent."
      ];

      function showMessage(text, sender = 'bot') {
        const msg = document.createElement('div');
        msg.className = 'message ' + sender;
        msg.textContent = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
      }

      window.handleInput = function () {
        const val = input.value.trim();
        if (!val) return;

        showMessage(val, 'user');
        responses.push(val);
        input.value = '';

        step++;
        if (step < questions.length - 1) {
          setTimeout(() => showMessage(questions[step]), 600);
        } else if (step === questions.length - 1) {
          setTimeout(() => {
            showMessage(questions[step]);
            const callLink = document.createElement('a');
            callLink.href = 'tel:+18333950861';
            callLink.className = 'cta-button';
            callLink.style.display = 'inline-block';
            callLink.style.marginTop = '10px';
            callLink.style.backgroundColor = '#4CAF50';
            callLink.style.color = 'white';
            callLink.style.padding = '10px 20px';
            callLink.style.borderRadius = '5px';
            callLink.style.textDecoration = 'none';
            callLink.textContent = '📞 Call Now To Enroll';
            messages.appendChild(callLink);
          }, 600);
        }
      };

      setTimeout(() => showMessage(questions[0]), 500);
    });
  `;
  document.body.appendChild(script);
})();
