import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { fetchApplerImageURL } from "../../utils/firebase-utils/firebase-util";
import { uploadCaption } from "../../utils/firebase-utils/firebase-util";
import { getApplerForRound } from "../../utils/firebase-utils/firebase-util";
import { everyoneCreatedACaptionListener } from "../../utils/firebase-utils/firebase-util";

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

let x = 0

const CaptionCreation: NextPage = () => {
  x = x + 1;
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode, URL },
  } = router;
  const props = {
    userName,
    roomID,
    roomCode,
    URL
  };
  
  async function navToVote() {
    x = 0
    console.log('navToVote')
    await Router.push({
      pathname: "/mvp/vote",
      query: {
        userName,
        roomID,
        roomCode,
        caption,
        URL
      },
    });
  }

  const [caption, setCaption] = useState("");

  const inputCaption = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCaption(event.target.value);
  };

  const [imgURL, setImgURL] = useState("")

  useEffect(() => {
    fetchApplerImageURL(Number(roomID)).then(imgURL => {
      setImgURL(imgURL)
    })
      return() => {imgURL}
  })

  async function uploadCaptionFunc() {
    everyoneCreatedACaptionListener(Number(roomID), navToVote)
    await uploadCaption(String(caption), String(userName), Number(roomID))
  }

  const [applerUsername, setApplerUsername] = useState("")

  async function getAppler(){
    const applerName = await getApplerForRound(Number(roomID)) ?? undefined
    if(applerName === undefined){
    }else{
      setApplerUsername(applerName)
      return() => {applerUsername}
    }
    }

  useEffect(() => {
    getAppler()
  })

  if(x === 0 || x === 1){
    everyoneCreatedACaptionListener(Number(roomID), navToVote);
  }

  return (
    <main>
      <h1>Caption the image</h1>
      <h3>Room {roomID}</h3>
      <h3>Appler: { applerUsername }</h3>
      <h4>This is the picture { applerUsername } generated</h4>
      <div>
        <Image src={imgURL} width={100} height={100} alt="Pretty Picture"></Image>
      </div>
      <h4>Caption this picture!</h4>
      <div>
        <input
          type="text"
          id="message"
          name="message"
          onChange={inputCaption}
          value={caption}
        />
      </div>
      <div>
        <button onClick={() => uploadCaptionFunc()}>submit</button>
      </div>
    </main>
  );
};

export default CaptionCreation;