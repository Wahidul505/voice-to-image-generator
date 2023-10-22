import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [imgPrompt, setImgPrompt] = useState("");
  const [isListening, setIsListening] = useState(false);

  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleStartListening = async () => {
    resetTranscript();
    setIsListening(true);
    setImgPrompt("");
    await SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const handleStopListening = async () => {
    setIsListening(false);
    setImgPrompt(transcript);
    await SpeechRecognition.stopListening();
    setLoading(true);
    console.log(transcript);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({ inputs: transcript }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <div>
      <div className="button-container">
        {isListening ? (
          <button onClick={() => handleStopListening()}>Stop Listening</button>
        ) : (
          <button onClick={() => handleStartListening()}>
            Start Listening
          </button>
        )}
      </div>
      <div>
        {loading && <div className="loading">Loading...</div>}
        {!loading && output && (
          <div className="result-image">
            <img src={output} alt="art" />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
