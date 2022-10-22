import type { NextPage } from "next";
import Image from "next/image";
import * as React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { getApplerForRound } from "../../utils/firebase-utils/firebase-util";
import { SetStateAction, useState, useEffect } from "react";
import { fetchApplerImageURL } from "../../utils/firebase-utils/firebase-util";

const Results: NextPage = () => {

  function navToHome() {
    Router.push({
      pathname: "/mvp/home",
    });
  }

  function navToLobby() {
    Router.push({
      pathname: "/mvp/lobby",
    });
  }

  const router = useRouter();
  const {
    query: { userName, roomID, caption, URL, roomCode, votes },
  } = router;
  const props = {
    userName,
    roomID,
    caption,
    URL,
    roomCode,
    votes
  };

  const displayVotes = () => {
    if (votes === "1") {
      return (<li>{userName} wrote: {caption}! It got 1 vote</li>)
    } else {
      return (<li>{userName} wrote: {caption}! It got {votes} votes</li>)
    }
  }

  const [applerUsername, setApplerUsername] = useState("")

  useEffect(() => {
    getApplerForRound(Number(roomID)).then(applerUsername =>
      setApplerUsername(applerUsername))
      return() => {applerUsername}
  })

  const [imgURL, setImgURL] = useState("")

  useEffect(() => {
    fetchApplerImageURL(Number(roomID)).then(imgURL => {
      setImgURL(imgURL)
    })
      return() => {imgURL}
  })

  return (
    <main>
      <h1>Game Over</h1>
      <h3>Room {roomCode}</h3>
      <h3>Appler: {applerUsername}</h3>
      <div>
        <Image src={imgURL} width={100} height={100} alt="Pretty Picture"></Image>
      </div>
      <h3>Leaderboard:</h3>
      <ol>
        {displayVotes()}
      </ol>
      {/* <h3>Winning Caption: { props.caption }</h3> */}
      <button onClick={() => navToLobby()}>New Game</button>
      <div>
        <button onClick={() => navToHome()}>End Session</button>
      </div>
    </main>
  );
};

export default Results;