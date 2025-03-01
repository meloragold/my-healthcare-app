import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Alert from "../components/ui/alert";

export default function VoiceToText() {
    const [isRecording, setIsRecording] = useState(false);
    const [notification, setNotification] = useState('');
    const [text, setText] = useState('');
    const [savedEntries, setSavedEntries] = useState([]);

    const handleStartRecording = () => {
        setIsRecording(true);
        setNotification('Recording started!');
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        setNotification('Recording stopped! You can now save your text.');
    };

    const handleSave = () => {
        if (text.trim() !== '') {
            setSavedEntries([...savedEntries, text]);
            setText('');
            setNotification('Text saved successfully!');
        } else {
            setNotification('Cannot save empty text!');
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-4xl mx-auto">
                <Card className="shadow-lg p-6 rounded-2xl">
                    <CardContent>
                        <h2 className="text-2xl font-bold mb-4">Voice-to-Text Documentation</h2>

                        {notification && (
                            <Alert className="mb-4" variant="success">
                                {notification}
                            </Alert>
                        )}

                        <textarea
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows="6"
                            placeholder="Start speaking or type here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            disabled={isRecording}
                        ></textarea>

                        <div className="mt-4 flex gap-4">
                            <Button onClick={handleStartRecording} disabled={isRecording}>
                                🎙️ Start Recording
                            </Button>
                            <Button onClick={handleStopRecording} disabled={!isRecording} variant="destructive">
                                🛑 Stop Recording
                            </Button>
                            <Button onClick={handleSave} disabled={isRecording || !text.trim()} variant="success">
                                💾 Save Text
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {savedEntries.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4">Saved Entries</h3>
                        <div className="space-y-4">
                            {savedEntries.map((entry, index) => (
                                <Card key={index} className="shadow-md">
                                    <CardContent>
                                        <p className="whitespace-pre-wrap">{entry}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Let me know if you want to add more features, like editing or deleting entries! 🚀
