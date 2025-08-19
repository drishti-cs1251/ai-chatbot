async function sendMessage() {
    const userMessage = document.getElementById("user-input").value;
    if (!userMessage.trim()) return; // Prevent empty messages

    // Display user message
    appendMessage("You", userMessage, "user-message");

    // Clear input
    document.getElementById("user-input").value = "";

    try {
        const response = await fetch("http://localhost:5001/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();

        // Display AI response
        const aiResponse = data.reply || "Sorry, I couldn't understand that.";
        appendMessage("AI", aiResponse, "bot-message");
    } catch (error) {
        appendMessage("AI", "Error: Could not connect to the server.", "bot-message");
    }
}

function appendMessage(sender, message, className) {
    const chatLog = document.getElementById("chat-log");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(className);
    messageDiv.innerText = `${sender}: ${message}`;
    chatLog.appendChild(messageDiv);

    // Scroll to the latest message
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Allow sending message with Enter key
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
