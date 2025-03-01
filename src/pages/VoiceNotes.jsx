import React, { useState } from "react";

export default function VoiceNotes() {
  const [notes, setNotes] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  // Speech-to-Text API
  const startRecording = () => {
    setIsRecording(true);
    const recognition = new window.webkitSpeechRecognition(); // For Chrome
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setNotes([...notes, transcript]);
      setIsRecording(false);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.start();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">🎤 Voice Notes</h2>

      <button 
        onClick={startRecording} 
        className={`px-4 py-2 rounded text-white ${isRecording ? "bg-gray-500" : "bg-blue-500"}`}
      >
        {isRecording ? "Listening..." : "Start Recording"}
      </button>

      <div className="mt-4">
        {notes.length > 0 && <h3 className="text-lg font-semibold">Saved Notes</h3>}
        {notes.map((note, index) => (
          <p key={index} className="bg-white p-2 rounded-lg shadow-md mt-2">{note}</p>
        ))}
      </div>
    </div>
  );
}
