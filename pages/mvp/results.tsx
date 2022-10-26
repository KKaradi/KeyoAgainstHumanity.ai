import type { NextPage } from "next";
import Image from "next/image";
import * as React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { getApplerForRound, getUserList, resetRoom } from "../../utils/firebase-utils/firebase-util";
import { SetStateAction, useState, useEffect } from "react";
import { fetchApplerImageURL, fetchCaptionVoteObject, nextRound, nextRoundHasBeenClicked } from "../../utils/firebase-utils/firebase-util";

const Results: NextPage = () => {

  function navToHome() {
    Router.push({
      pathname: "/mvp/home",
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

  useEffect(() => {
    fetchCaptionVoteObject(Number(roomID)).then(
      (captionVotes) => {
        setCaptionVotes(captionVotes)
      }
    )
  })

  const [applerUsername, setApplerUsername] = useState("")

  async function getAppler(){
    await getApplerForRound(Number(roomID)).then(applerUsername =>
      setApplerUsername(applerUsername))
      return() => {applerUsername}
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

  async function navToLobbyOrHome(roundNum: Number, UserListLength: Number) {

    if(roundNum >= UserListLength){
      await Router.push({
        pathname: "/mvp/home",
      });

    }else if(roundNum < UserListLength){
    await Router.push({
      pathname: '/mvp/lobby',
      query: {
        userName,
        roomID,
      },
    })
  }
  }

  useEffect(() => {
    nextRoundHasBeenClicked(Number(roomID), function(roundNum, UserListLength){navToLobbyOrHome(roundNum, UserListLength)});
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
      {/* <h3>Winning Caption: { props.caption }</h3> */}
      <button onClick={() => nextRound(Number(roomID))}>Next Round</button>
      <div>
        <button onClick={() => navToHome()}>End Session</button>
      </div>
    </main>
  );
};

export default Results;