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

  return (
    <main>
      <h1>Voting</h1>
      <h3>Room {roomID}</h3>
      <h3>Appler: {applerUsername}</h3>
      <h4>This is the picture {applerUsername} generated</h4>
      <Image src={imgURL} width={100} height={100} alt="Pretty Picture" />
      <h4>These are the captions the players came up with</h4>
      <h4>Vote for your favorite caption!</h4>
      <div>
        { displayCaptions() }
      </div>
    </main>
  );
};

export default Vote;