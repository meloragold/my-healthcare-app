const vosk = require("vosk");
const record = require("node-record-lpcm16");
const fs = require("fs");
const path = require("path");

// Set the Vosk model path
const modelPath = path.join(__dirname, "vosk-model-small-en-us-0.15");

if (!fs.existsSync(modelPath)) {
    console.error("❌ Model not found! Make sure you extracted the model correctly.");
    process.exit(1);
}

// Initialize Vosk model
vosk.setLogLevel(0);
const model = new vosk.Model(modelPath);
const recognizer = new vosk.Recognizer({ model: model, sampleRate: 16000 });

console.log("🎙️ Listening for speech... (Press Ctrl+C to stop)");

// Start recording using node-record-lpcm16
const micStream = record.start({
    sampleRate: 16000,
    threshold: 0, // Always listening
    recordProgram: "sox", // Use "rec" or "sox"
    verbose: false
});

micStream.on("data", (data) => {
    if (recognizer.acceptWaveform(data)) {
        console.log("📝 Recognized:", recognizer.result().text);
    }
});

// Handle script termination
process.on("SIGINT", () => {
    console.log("\n🛑 Stopping...");
    record.stop();
    recognizer.free();
    model.free();
    process.exit(0);
});
