import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { generateImage } from "../../utils/image-utils/image-util";
import { fetchUserImageURL, getApplerForRound, uploadImageURL, uploadPrompt } from "../../utils/firebase-utils/firebase-util";
import { everyoneGeneratedAnImageListener } from "../../utils/firebase-utils/firebase-util";

import { get, ref, getDatabase, child, off } from "firebase/database";

import { initializeApp } from "firebase/app";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
const databaseURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const projectID = process.env.NEXT_PUBLIC_PROJECT_ID;
const storagebucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectID,
  storageBucket: storagebucket,
  messagingSenderId: messagingSenderId,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let x = 0;
let timerToNextPage: NodeJS.Timeout

const GenerateImages: NextPage = () => {
  x = x + 1;
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode },
  } = router;
  const props = {
    userName,
    roomID,
  };

  const [prompt, setPrompt] = useState("");

  const inputPrompt = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPrompt(event.target.value);
  };

  const [URL, setURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
  );

  const generateImageWrapper = async(prompt: string) => {
    if(prompt != null){
    const newURL = await generateImage(prompt);
    setURL(newURL)
    }
  }

  const uploadURLUploadPrompt = async () => {
    clearTimeout(timerToNextPage)
    await uploadImageURL(String(URL), String(userName), Number(roomID));
    await uploadPrompt(Number(roomID), String(userName), String(prompt));
  };

  const [applerUsername, setApplerUsername] = useState("")

  async function getAppler(){
    const applerName = (await getApplerForRound(Number(roomID)) ?? undefined)
    if(applerName === undefined){
      return(undefined)
    }else{
      setApplerUsername(applerName)
      return(applerName)
    }
    }

  useEffect(() => {
    getAppler()
  })

  async function navToCaptionCreate() {
    x = 0
    clearTimeout(timerToNextPage)
    const applerUndefined = await getAppler()

    if(applerUsername === userName && applerUndefined != undefined){
    console.log('navToApplerWait')
    await Router.push({
      pathname: "/mvp/appler-wait",
      query: {
        userName,
        roomID,
        roomCode,
        URL
      },
    });
  }else if(applerUsername != userName && applerUndefined != undefined){
    console.log('navToCaptionCreate')
    await Router.push({
      pathname: "/mvp/caption-creation",
      query: {
        userName,
        roomID,
        roomCode,
        URL
      },
    });
  }else{
    await Router.push({
      pathname: "/mvp/home",
    });
  }
  }

  if(x === 0 || x === 1){
    everyoneGeneratedAnImageListener(Number(roomID), navToCaptionCreate);
  }

  if(x === 0 || x === 1){
    timerToNextPage = setTimeout(uploadURLUploadPrompt, 30000);
  }

  return (
    <main>
      <h1>Generate Image</h1>
      <h3>Room {roomID} {roomCode}</h3>
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
      </div>
      <div>
        <button onClick={() => generateImageWrapper(prompt)}>Generate</button>
      </div>
      <div>
        <button onClick={uploadURLUploadPrompt}>Submit</button>
      </div>
    </main>
  );
};

export default GenerateImages;