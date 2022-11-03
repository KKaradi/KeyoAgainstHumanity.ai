import type { NextPage } from "next";
import React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { getUserList, resetRoom, returnUserListAndRoundNum } from "../../utils/firebase-utils/firebase-util";
import { startGame } from "../../utils/firebase-utils/firebase-util";
import { startedGameListener } from "../../utils/firebase-utils/firebase-util";
import { userListChangedListener } from "../../utils/firebase-utils/firebase-util";
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

const Lobby: NextPage = () => {
  x = x + 1;
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode },
  } = router;
  const props = {
    userName,
    roomID,
  };

  async function navToHome() {
    console.log('navToHome')
    x = 0
    await Router.push({
      pathname: "/mvp/home",
    });
  }

  async function navToGenerate() {
    x = 0
    console.log('navToGenerate')
    await Router.push({
      pathname: "/mvp/generate-images",
      query: {
        userName,
        roomID,
        roomCode
      },
    });
  }

  const [userList, setUserList] = useState([""])

  const displayUserList = () => {
      getUserList(Number(roomID)).then(
        (userList) => {
          setUserList(userList)
        }
      )
    return (
      <ul>{ userList.map(
        (user) => <li key = { user }>{ user }</li>
      ) }</ul>
    )
  }

  if(x === 0 || x === 1){
    userListChangedListener(Number(roomID), displayUserList);
  }
  
  if(x === 0 || x === 1){
    startedGameListener(Number(roomID), navToGenerate);
  }

  return (
    <main>
      <h1>Lobby</h1>
      <h3>
        Room {roomID} {roomCode}
      </h3>
      <h4>Users:</h4>
      <div>{displayUserList()}</div>
      <div>
        <button onClick={() => startGame(Number(roomID))}>Start Round</button>
      </div>
      <div>
        <button onClick={() => navToHome()}>Exit Room</button>
      </div>
    </main>
  );
};

export default Lobby;