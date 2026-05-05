import { useState } from "react";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const newMessages = [...messages, { role: "user", text: question }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "bot",
           text: data.answer,
           sources:data.sources
           }
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "bot", text: "Something went wrong." }
      ]);
    }

    setLoading(false);
    setQuestion("");
  };

  return (
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl flex flex-col h-[520px]">
      
      <div className="text-white font-semibold mb-4">
        Chat
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {/* {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] transition-all ${
              msg.role === "user"
                ? "ml-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "bg-white/20 text-white border border-white/10"
            }`}
          >
            {msg.text}
          </div>
        ))} */}
        {messages.map((msg, i) => (
  <div key={i} className="space-y-1">
    
    <div
      className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] ${
        msg.role === "user"
          ? "ml-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          : "bg-white/20 text-white"
      }`}
    >
      {msg.text}
    </div>

    {/* ✅ SOURCES */}
    {msg.sources && (
      <div className="text-xs text-gray-300 ml-2">
        Sources:
        {msg.sources.map((src, idx) => (
          <div key={idx}>
            • {src.source} (page {src.page})
          </div>
        ))}
      </div>
    )}

  </div>
))}

        {loading && (
          <div className="text-gray-300 text-sm animate-pulse">
            AI is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-4">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={askQuestion}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:scale-105 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;