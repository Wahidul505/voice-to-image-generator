import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function App() {
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  const handleStartListening = async () => {
    await SpeechRecognition.startListening({
      continuous: true,
      // language: "eng",
    });
  };
  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  console.log(transcript);
  return (
    <>
      <div>
        <h1>Voice to Image Generator</h1>
        <div id="text-box">{transcript}</div>
        <div className="button-container">
          <button onClick={() => handleStartListening()}>
            Start Listening
          </button>
          <button onClick={() => handleStopListening()}>Stop Listening</button>
        </div>
      </div>
    </>
  );
}

export default App;
