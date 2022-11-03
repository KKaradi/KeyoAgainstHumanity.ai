import type { NextPage } from "next";
import Image from "next/image";
import * as React from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import {
  endSessionClicked,
  everyoneWentListener,
  getApplerForRound,
  resetRoom,
  returnUserListAndRoundNum,
} from "../../utils/firebase-utils/firebase-util";
import { useState, useEffect } from "react";
import {
  fetchApplerImageURL,
  fetchCaptionVoteObject,
  nextRound,
  nextRoundHasBeenClicked,
} from "../../utils/firebase-utils/firebase-util";

async function navToHome(roomID: number) {
  await Router.push({
    pathname: "/mvp/home",
  });
  setTimeout(() => resetRoom(Number(roomID)), 10000);
}

async function navToLobby(userName: string, roomID: number) {
  await Router.push({
    pathname: "/mvp/lobby",
    query: {
      userName,
      roomID,
    },
  });
}

const Results: NextPage = () => {

  const router = useRouter();
  const {
    query: { userName, roomID, caption, URL, votes },
  } = router;

  const [captionVotes, setCaptionVotes] = useState({});

  useEffect(() => {
    fetchCaptionVoteObject(Number(roomID)).then((captionVotes) => {
      setCaptionVotes(captionVotes);
    });
  });

  const [applerUsername, setApplerUsername] = useState("");

  useEffect(() => {
    getApplerForRound(Number(roomID)).then((applerUsername) => {
      setApplerUsername(applerUsername)
    });
  })

  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    fetchApplerImageURL(Number(roomID)).then((imgURL) => {
      setImgURL(imgURL);
    });
    return () => {
      imgURL;
    };
  });

  const [nav, setNav] = useState(String);

  useEffect(() => {
    returnUserListAndRoundNum(Number(roomID)).then((nav) => {
      setNav(nav);
    });
    return () => {
      nav;
    };
  });

  function resetOrNo() {
    if (nav === "reset") {
      return (
        <button onClick={() => endSessionClicked(Number(roomID))}>
          End Session
        </button>
      );
    } else if (nav === "no reset") {
      return (
        <button onClick={() => nextRound(Number(roomID))}>Next Round</button>
      );
    }
  }

  useEffect(() => {
    nextRoundHasBeenClicked(Number(roomID), () => navToLobby(String(userName), Number(roomID)));
  }, [roomID, userName]);

  useEffect(() => {
    everyoneWentListener(Number(roomID), () => navToHome);
  }, [roomID]);

  return (
    <main>
      <h1>Game Over</h1>
      <h3>Room {roomID}</h3>
      <h3>Appler: {applerUsername}</h3>
      <div>
        <Image
          src={imgURL}
          width={100}
          height={100}
          alt="Pretty Picture"
        ></Image>
      </div>
      <h3>Leaderboard:</h3>
      <div>
        <ul>
          {Object.keys(captionVotes).map((caption, index) => {
            return (
              <li key={index}>
                {caption} got{" "}
                {captionVotes[caption as keyof typeof captionVotes]} votes.
              </li>
            );
          })}
        </ul>
      </div>
      <div>{resetOrNo()}</div>
    </main>
  );
};

export default Results;
