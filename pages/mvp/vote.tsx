import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { fetchListOfCaptions, getApplerForRound, vote } from "../../utils/firebase-utils/firebase-util";
import { fetchApplerImageURL } from "../../utils/firebase-utils/firebase-util";
import { everyoneCastAVoteListener, updateLeaderboard } from "../../utils/firebase-utils/firebase-util";

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

const Vote: NextPage = () => {
  x = x + 1;
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode, caption, URL },
  } = router;
  const props = {
    userName,
    roomID,
    roomCode,
    caption,
    URL
  };

  async function navToResults() {
    x = 0
    console.log('navToResults')
    await Router.push({
      pathname: "/mvp/results",
      query: {
        userName,
        roomID,
        roomCode,
        URL,
        caption
      },
    });
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

  const [imgURL, setImgURL] = useState("")

  useEffect(() => {
    fetchApplerImageURL(Number(roomID)).then(imgURL => {
      setImgURL(imgURL)
    })
      return() => {imgURL}
  })

  const [captionList, setCaptionList] = useState([""])

  function displayCaptions() {
    fetchListOfCaptions(Number(roomID)).then(
      (captionList) => {
        setCaptionList(captionList)
      }
    )

  const voteAndUpdateLeaderboard = async (caption: string) => {
    await vote(caption, Number(roomID))
    await updateLeaderboard(Number(roomID), String(caption))
  }

    return( 
      <div>
        {
          captionList.map(
            (caption) => <button key = { caption } onClick = {() => voteAndUpdateLeaderboard(caption)}>{ caption }</button>
          )
        }
      </div>
    )
  }

  if(x === 0 || x === 1){
    everyoneCastAVoteListener(Number(roomID), navToResults);
  }

  const waves = "/waveboi.png";
  const top = "/top.png";
  
  return (
    <main>
 <Image src={top}  width={10000} height={600} alt ="shapes top header" className="top"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <ul className="flex-container">
        <li className="lobby-flex">
        <h1>{applerUsername}&#39;S PAINTING</h1>
      <div className="generatedimg">
      <Image src={imgURL} width={400} height={400} alt="Pretty Picture" />
      </div>
          
                    
        </li>
        <li className="lobby-flex">
          <h1>VOTE ON YOUR FAVORITE CAPTION</h1>

          <div className="sit">
        { displayCaptions() }
      </div>
      
        </li>
      </ul>
      <Image src={waves}  width={2400} height={400} alt ="waves at the bottom of the screen" className="waveslobby"/>
      
    </main>
  );
};

export default Vote;