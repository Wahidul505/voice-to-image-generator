import { useState } from "react";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ImageGenerationForm from "./components/ImageGenerationForm";

// import OpenAI from "openai";

// const openAI = new OpenAI({
//   apiKey: "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",
//   dangerouslyAllowBrowser: true,
// });

function App() {
  const [imgPrompt, setImgPrompt] = useState("");
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  const handleStartListening = async () => {
    setImgPrompt("");
    await SpeechRecognition.startListening({
      continuous: true,
      // language: "eng",
    });
  };
  const handleStopListening = async () => {
    setImgPrompt(transcript);
    SpeechRecognition.stopListening();
    if (imgPrompt) {
      // const response = await openAI.images.createVariation(
      //   transcript,
      //   4,
      //   "512x512"
      // );
      // console.log(response);
      console.log({
        prompt: transcript,
        n: 4,
        size: "512x512",
      });
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
            "User-Agent": "Chrome",
          },
          body: JSON.stringify({
            prompt: transcript,
            n: 4,
            size: "512x512",
          }),
        }
      );
      console.log(response);
    }
  };

  return (
    <>
      {/* <div>
        <h1>Voice to Image Generator</h1>
        <div id="text-box">{transcript}</div>
        <div className="button-container">
          <button onClick={() => handleStartListening()}>
            Start Listening
          </button>
          <button onClick={() => handleStopListening()}>Stop Listening</button>
        </div>
      </div> */}
      <ImageGenerationForm />
    </>
  );
}

export default App;
