import { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateText = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setCopied(false);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      setGeneratedText(data.generatedText);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      {/* Background Gradient Orbs */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <main className="relative w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            ✨ Powered by AI
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Text Generator
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Enter any prompt or topic below to generate high-quality text instantly.
          </p>
        </div>

        {/* Input & Action Section */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., Explain Quantum Computing in simple terms..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateText()}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-500 outline-none transition duration-200"
            />
          </div>

          <button
            onClick={generateText}
            disabled={loading || !topic.trim()}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-600/25 transition duration-200"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating...</span>
              </>
            ) : (
              <span>Generate Response</span>
            )}
          </button>
        </div>

        {/* Generated Output Display */}
        {(generatedText || loading) && (
          <div className="mt-8 border-t border-slate-800/80 pt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Generated Result
              </h2>
              {generatedText && (
                <button
                  onClick={copyToClipboard}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition"
                >
                  {copied ? "✓ Copied!" : "Copy Text"}
                </button>
              )}
            </div>

            <div className="bg-slate-950 border border-slate-800/60 rounded-xl p-5 min-h-[120px] text-slate-200 leading-relaxed whitespace-pre-wrap">
              {loading ? (
                <div className="flex items-center gap-2 text-slate-500">
                  <div className="h-2 w-2 bg-indigo-500 rounded-full animate-ping" />
                  Thinking and writing...
                </div>
              ) : (
                generatedText
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;