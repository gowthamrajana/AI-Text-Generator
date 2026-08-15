import { useState } from "react";

function App() {
    const [topic, setTopic] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [loading, setLoading] = useState(false);

    const generateText = async () => {
        if (!topic.trim()) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:5000/api/ai/generate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        topic: topic
                    })
                }
            );

            const data = await response.json();

            setGeneratedText(data.generatedText);
        } catch (error) {
            console.error("Error:", error);
        }

        setLoading(false);
    };

    return (
        <div>
            <h1>AI Text Generator</h1>

            <input
                type="text"
                placeholder="Enter a topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />

            <button onClick={generateText}>
                {loading ? "Generating..." : "Generate"}
            </button>

            <div>
                <h2>Generated Text</h2>
                <p>{generatedText}</p>
            </div>
        </div>
    );
}

export default App;