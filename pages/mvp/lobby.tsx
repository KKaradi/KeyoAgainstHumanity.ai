import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { getUserList, resetRoom, returnUserListAndRoundNum } from "../../utils/firebase-utils/firebase-util";
import { startGame } from "../../utils/firebase-utils/firebase-util";
import { startedGameListener } from "../../utils/firebase-utils/firebase-util";
import { userListChangedListener } from "../../utils/firebase-utils/firebase-util";
import { get, ref, getDatabase, child } from "firebase/database";

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


const Lobby: NextPage = () => {
  
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode },
  } = router;
  const props = {
    userName,
    roomID,
  };

  async function navToHome() {
    await Router.push({
      pathname: "/mvp/home",
    });
  }

  async function navToGenerate() {
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

  useEffect(() => {
    userListChangedListener(Number(roomID), displayUserList);
  })

  useEffect(() => {
    startedGameListener(Number(roomID), navToGenerate);
  })

  return (
    <main>
      <h1>Lobby</h1>
      <h3>
        Room {roomID} {roomCode}
      </h3>
      <h4>Users:</h4>
      <ul>
        <li>{userName}</li>
      </ul>
      <div>
        <button onClick={() => navToGenerate()}>Start Game</button>
      </div>
      <div>
        <button onClick={() => navToHome()}>Home</button>
      </div>
    </main>
  );
};

export default Lobby;
