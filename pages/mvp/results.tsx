import type { NextPage } from "next";
import Image from "next/image";
import * as React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { getApplerForRound } from "../../utils/firebase-utils/firebase-util";
import { SetStateAction, useState, useEffect } from "react";
import { fetchApplerImageURL, fetchCaptionVoteObject } from "../../utils/firebase-utils/firebase-util";
import { nextRoundHasBeenClicked } from "../../utils/firebase-utils/firebase-util";
import { nextRound } from "../../utils/firebase-utils/firebase-util";

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

  const [captionVotes, setCaptionVotes] = useState({})

  function displayVotes () {
    fetchCaptionVoteObject(Number(roomID)).then(
      (captionVotes) => {
        setCaptionVotes(captionVotes)
      }
    )
    return (
      <ul>
        {
          Object.keys(captionVotes).map(
            (caption, index) => {
              return(<li key = {index}>{caption} got {captionVotes[caption as keyof typeof captionVotes]} votes.</li>)
            }
          )
        }
      </ul>
    )
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

  function navToCaptionCreate() {
    if(applerUsername == userName){
    Router.push({
      pathname: "/mvp/appler-wait",
      query: {
        userName,
        roomID,
        roomCode,
        URL
      },
    });
  }else{
    Router.push({
      pathname: "/mvp/caption-creation",
      query: {
        userName,
        roomID,
        roomCode,
        URL
      },
    });
  }
  }

  useEffect(() => {
    nextRoundHasBeenClicked(Number(roomID), navToCaptionCreate);
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
      <div>
        {displayVotes()}
      </div>
      <button onClick={() => nextRound(Number(roomID))}>Next Round</button>
      <div>
        <button onClick={() => navToHome()}>End Session</button>
      </div>
    </main>
  );
};

export default Results;