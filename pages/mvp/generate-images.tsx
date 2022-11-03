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
// let timer: NodeJS.Timeout;
// let clearTimer = false;

const GenerateImages: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode },
  } = router;
  const props = {
    userName,
    roomID,
  };

  const top = "/top.png";
  const waves = "/waveboi.png";

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
    // clearTimeout(timer)
    // clearTimer = true;
    await uploadImageURL(String(URL), String(userName), Number(roomID));
    await uploadPrompt(Number(roomID), String(userName), String(prompt));
  };

  async function navToCaptionCreate() {
    const applerUsername = await getApplerForRound(Number(roomID))
    if(applerUsername === userName){
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
  }else if(applerUsername != userName){
    console.log('navToCaptionCreate')
    await Router.push({
      pathname: "/mvp/caption-creation",
      query: {
        userName,
        roomID,
        roomCode,
        URL
      },
  })
  }
}

  if(x === 0 || x === 1){
    everyoneGeneratedAnImageListener(Number(roomID), stopTimerAndNextPage);
    // timer = setTimeout(timerFunc, 30000)
  }

  async function stopTimerAndNextPage(){
    await navToCaptionCreate()
    // clearTimer = true;
    // clearTimeout(timer)
  }

  // async function timerFunc(){
  //   if(clearTimer === false){
  //   await uploadURLUploadPrompt()
  //   }
  // }

  x = x + 1;

  return (
    
    <main>
      <Image src={top}  width={10000} height={600} alt ="shapes top header" className="top"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <ul className="flex-container">
        <li className="lobby-flex">
        <h1>GENERATE IMAGE</h1>
      <div className="generatedimg">
        <Image src={URL} width={400} height={400} alt="Pretty Picture"></Image>
      </div>
          
                    
        </li>
        <li className="lobby-flex">
          <h1>INSERT PROMPT HERE:</h1>
      <ul>
      
        
      </ul>
      <div>
        <input className="textbox"
          type="text"
          id="message"
          name="message"
          onChange={inputPrompt}
          value={prompt}
        />
      </div>
      
      <div className="changebuttons">
      <div>
        <button className="genbtn" onClick={() =>  generateImageWrapper(prompt)}>Generate</button>
      
        <button className="genbtn" onClick={() => uploadURLUploadPrompt()}>Submit</button>
      </div>
      </div>
        </li>
      </ul>
      <Image src={waves}  width={2400} height={400} alt ="waves at the bottom of the screen" className="waveslobby"/>


    </main>




  );
};

export default GenerateImages;