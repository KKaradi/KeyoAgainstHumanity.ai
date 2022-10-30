import type { NextPage } from "next";
import Image from "next/image";
import * as React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { getApplerForRound, getUserList } from "../../utils/firebase-utils/firebase-util";
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

  function navToLobby(roundNum: Number, UserListLength: Number) {

    if(roundNum >= UserListLength){
      Router.push({
        pathname: "/mvp/home",
      });

    }else{
    Router.push({
      pathname: '/mvp/lobby',
      query: {
        userName,
        roomID,
      },
    })
  }
  }

  useEffect(() => {
    nextRoundHasBeenClicked(Number(roomID), function(roundNum, UserListLength){navToLobby(roundNum, UserListLength)});
  })
  const waves = "/waveboi.png";
  const top = "/top.png";
  return (
    <main>

<Image src={top}  width={10000} height={600} alt ="shapes top header" className="top"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <ul className="flex-container">
        <li className="lobby-flex">
        <h1>GAME OVER</h1>
        <div>
        <Image src={imgURL} width={400} height={400} alt="Pretty Picture"></Image>
      </div>      
        </li>
        <li className="lobby-flex">
          <h1>LEADERBOARD:</h1>
          <div>
        <ul>
        {
          Object.keys(captionVotes).map(
            (caption, index) => {
              return(<li className="sit" key = {index}>{caption} got {captionVotes[caption as keyof typeof captionVotes]} votes.</li>)
            }
          )
        }
      </ul>
      </div>
      {/* <h3>Winning Caption: { props.caption }</h3> */}
          
      <button className="genbtn" onClick={() => nextRound(Number(roomID))}>Next Round</button>
      
        <button className="genbtn" onClick={() => navToHome()}>End Session</button>
      
        </li>
      </ul>
      <Image src={waves}  width={2400} height={400} alt ="waves at the bottom of the screen" className="waveslobby"/>
      
    </main>
  );
};

export default Results;