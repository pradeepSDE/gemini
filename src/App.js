import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
const { initHist } = require("./initHist");
function App() {
  const [promptText, setprompText] = useState("");
  const [res, setRes] = useState("");

  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  const MODEL_NAME = "gemini-1.0-pro-001";
  const API_KEY = "AIzaSyAhQwZxJ0YUmgDkEbyiNrA1i5iOJy6rZKE";

  async function run() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const parts = [
      { text: "input: What are Pradeep's interests?" },
      {
        text: "output: Pradeep is highly interested in web development and also quite curious about AI/ML.",
      },
      { text: "input: tell me about yourself" },
      {
        text: "output: my name is pradeep AI iam chatbot working as a  personal assistance of pradeep bisen.",
      },
      { text: "input: who is pradeep" },
      {
        text: "output: pradeep is a talented web developer who works on the mern tech stack. he is a 3rd year student at government engineering college raipur. he studies engineering in electroncs and telecommunication branch.",
      },
      { text: "input: what is pradeeps age" },
      { text: "output: he was born on 09/09/2002" },
      { text: "input: what are the interests of pradeep" },
      {
        text: "output: pradeep is highly interested in web developement also he is quiite curious about ai/ml",
      },
      { text: "input: what are the hobbies of pradeep" },
      { text: "output: pradeep enjoys playing cricket." },
      { text: "input: who is pradeep" },
      { text: "output: " },
    ];

    const chat = await model.startChat({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
      history: [...initHist],
    });
    const result = await chat.sendMessage(`${promptText}`);
    const response = result.response;
    response && console.log(response.text());
    response && setRes(response.text());

    // console.log(response.text());
  }

  const handleClick = () => {
    run();
  };

  // runChat();

  return (
    <div>
      <input
        value={promptText}
        onChange={(e) => setprompText(e.target.value)}
      ></input>
      <button onClick={handleClick}>run</button>

      <div>
        <pre>{res}</pre>
      </div>
    </div>
  );
}

export default App;
