import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchApplerImageURL } from "../../utils/firebase-utils/firebase-util";
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

const ApplerWait: NextPage = () => {
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
        URL
      },
    });
  }
  const [imgURL, setImgURL] = useState("")

  useEffect(() => {
    fetchApplerImageURL(Number(roomID)).then(imgURL => {
      setImgURL(imgURL)
    })
      return() => {imgURL}
  })

  if(x === 0 || x === 1){
    everyoneCreatedACaptionListener(Number(roomID), navToVote);
  }

  const waves = "/waveboi.png";
const top = "/top.png";

  return (
    <main>
<Image src={top}  width={10000} height={600} alt ="shapes top header" className="top"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <ul className="flex-container">
        <li className="lobby-flex">
        <div>
        <Image src={imgURL} width={400} height={400} alt="Pretty Picture"></Image>
      </div>    
        </li>
        </ul>
        <div>
        <h1 className="sit">Sit tight while everyone captions your image!</h1>
        </div>
      
      <Image src={waves}  width={2400} height={400} alt ="waves at the bottom of the screen" className="waveslobby"/>

    </main>
  );
};

export default ApplerWait;