import type { NextPage } from "next";
import Image from "next/image";
import * as React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { createRoom, endSessionClicked, everyoneWentListener, getApplerForRound, getUserList, joinRoom, resetRoom, returnUserListAndRoundNum } from "../../utils/firebase-utils/firebase-util";
import { SetStateAction, useState, useEffect } from "react";
import { fetchApplerImageURL, fetchCaptionVoteObject, nextRound, nextRoundHasBeenClicked } from "../../utils/firebase-utils/firebase-util";

const Results: NextPage = () => {

  const resetRoomConst = () =>{
    resetRoom(Number(roomID))
  }

  async function navToHome() {
    await Router.push({
      pathname: "/mvp/home",
    });
    setTimeout(resetRoomConst, 10000)
  }

  async function navToLobby() {
    await Router.push({
      pathname: '/mvp/lobby',
      query: {
        userName,
        roomID,
      },
    })

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

  useEffect(() => {
    fetchCaptionVoteObject(Number(roomID)).then(
      (captionVotes) => {
        setCaptionVotes(captionVotes)
      }
    )
  })

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

  const [nav, setNav] = useState(String)
  
  useEffect(() => {
    returnUserListAndRoundNum(Number(roomID)).then(nav => {
      setNav(nav)
    })
      return() => {nav}
  })

  function joinRoomNavToLobby() {
    joinRoom(String(userName), Number(roomID))
    navToLobby()
  }

  function newGame() {
    navToHome()
    // resetRoom(Number(roomID))
    // createRoom(Number(roomID))
    joinRoomNavToLobby()
  }

  function resetOrNo() {
    if(nav === 'reset'){
      return(
        <div>
          <button onClick = {() => newGame()}>New Game</button>
          <button onClick={() => endSessionClicked(Number(roomID))}>End Session</button>
        </div>
      )
    }else if(nav === 'no reset'){
      return(<button onClick={() => nextRound(Number(roomID))}>Next Round</button>)
    }
  }

  useEffect(() => {
    nextRoundHasBeenClicked(Number(roomID), navToLobby);
  })

  useEffect(() => {
    everyoneWentListener(Number(roomID), navToHome)
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
        <ul>
        {
          Object.keys(captionVotes).map(
            (caption, index) => {
              return(<li key = {index}>{caption} got {captionVotes[caption as keyof typeof captionVotes]} votes.</li>)
            }
          )
        }
      </ul>
      </div>
      <div>{resetOrNo()}</div>
    </main>
  );
};

export default Results;