import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setSummary(""); // Clear old summary

    try {
      const res = await axios.post("http://localhost:5000/api/summarize", {
        text: inputText,
      });
      setSummary(res.data.summary);
    } catch (error) {
      console.error("Error:", error);
      setSummary("❌ Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        🧠 AI Notes Summarizer
      </h1>

      <textarea
        className="w-full max-w-2xl h-52 p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        placeholder="📄 Paste your notes here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        onClick={handleSummarize}
        disabled={loading}
        className={`mt-4 px-6 py-2 rounded-md font-semibold text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {loading ? "⏳ Summarizing..." : "✨ Summarize"}
      </button>

      {summary && (
        <div className="mt-6 w-full max-w-2xl bg-white rounded-xl p-5 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">📋 Summary:</h2>
          <p className="text-gray-800 whitespace-pre-wrap">{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
