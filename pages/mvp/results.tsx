import type { NextPage } from "next";
import Image from "next/image";
import * as React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { endSessionClicked, everyoneWentListener, getApplerForRound, getUserList, resetRoom, returnUserListAndRoundNum, fetchLeaderboard } from "../../utils/firebase-utils/firebase-util";
import { SetStateAction, useState, useEffect } from "react";
import { fetchApplerImageURL, fetchCaptionVoteObject, nextRound, nextRoundHasBeenClicked } from "../../utils/firebase-utils/firebase-util";

let x = 0;

const Results: NextPage = () => {
  const resetRoomConst = () =>{
    resetRoom(Number(roomID))
  }

  async function navToHome() {
    x = 0
    await Router.push({
      pathname: "/mvp/home",
    });
    setTimeout(resetRoomConst, 10000)
  }

  async function navToLobby() {
    x = 0
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

  if(x === 0 || x === 1){
    nextRoundHasBeenClicked(Number(roomID), navToLobby);
  }

  useEffect(() => {
    console.log('everoneWentListener')
    everyoneWentListener(Number(roomID), navToHome);
  })

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
    getApplerForRound(Number(roomID)).then(
      (applerUsername) => {
        setApplerUsername(applerUsername)
      }
    )
  })

  const [leaderboard, setLeaderboard] = useState({})

  useEffect(() => {
    fetchLeaderboard(Number(roomID)).then(
      (leaderboard) => {
        setLeaderboard(leaderboard)
      }
    )
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

  function resetOrNo() {
    if(nav === 'reset'){
      return(<button onClick={() => endSessionClicked(Number(roomID))}>End Session</button>)
    }else if(nav === 'no reset'){
      return(<button onClick={() => nextRound(Number(roomID))}>Next Round</button>)
    }
  }

  x = x + 1;

  return (
    <main>
      <h1>Game Over</h1>
      <h3>Room {roomCode}</h3>
      <h3>Appler: {applerUsername}</h3>
      <div>
        <Image src={imgURL} width={100} height={100} alt="Pretty Picture"></Image>
      </div>
      <h3>Results:</h3>
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
      <div>
      <h3>Leaderboard:</h3>
      </div>
      <div>
        <ul>
        {
          Object.keys(leaderboard).map(
            (username, index) => {
              return(<li key = {index}>{username} has {leaderboard[username as keyof typeof captionVotes]} points.</li>)
            }
          )
        }
      </ul>
      </div>
      {/* <h3>Winning Caption: { props.caption }</h3> */}
      <div>{resetOrNo()}</div>
    </main>
  );
};

export default Results;