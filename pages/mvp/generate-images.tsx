import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { generateImage } from "../../utils/image-utils/image-util";
import { getApplerForRound, uploadImageURL, uploadPrompt } from "../../utils/firebase-utils/firebase-util";
import { everyoneGeneratedAnImageListener } from "../../utils/firebase-utils/firebase-util";

const GenerateImages: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode },
  } = router;
  const props = {
    userName,
    roomID,
  };

  function navToPromptCreate() {
    Router.push({
      pathname: "/mvp/prompt-creation",
      query: {
        userName,
        roomID,
        roomCode,
        URL
      },
    });
  }

  const [prompt, setPrompt] = useState("");

  const inputPrompt = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPrompt(event.target.value);
  };

  const [URL, setURL] = useState("https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921");

  const generateImageWrapper = async(prompt: string) => {
    const newURL = await generateImage(prompt);
    setURL(newURL)
  }

  const uploadURLUploadPrompt = () => {
    uploadImageURL(URL, String(userName), Number(roomID));
    uploadPrompt(Number(roomID), String(userName), prompt);
  }

  const [applerUsername, setApplerUsername] = useState("")

  function displayApplerUsername() {
    getApplerForRound(Number(roomID)).then(
      (applerUsername) => {
        setApplerUsername(applerUsername)
      }
    )
    return (applerUsername)
  }

  useEffect(() => {
    everyoneGeneratedAnImageListener(Number(roomID), navToPromptCreate);
  })

  return (
    <main>
      <h1>Generate Image</h1>
      <h3>Room {roomID} {roomCode}</h3>
      <h3>Appler: </h3>
      <div>{ displayApplerUsername() }</div>
      <h4>Generate your image</h4>
      <div>
        <Image src={URL} width={100} height={100} alt="Pretty Picture"></Image>
      </div>
      <div>
        <p>Input prompt</p>
        <input
          type="text"
          id="message"
          name="message"
          onChange={inputPrompt}
          value={prompt}
        />
        <textarea onChange={inputPrompt}>Test</textarea>
      </div>
      <div>
        <button onClick={() => generateImageWrapper(prompt)}>Generate</button>
      </div>
      <div>
        <button onClick={() => uploadURLUploadPrompt()}>Submit</button>
      </div>
    </main>
  );
};

export default GenerateImages;