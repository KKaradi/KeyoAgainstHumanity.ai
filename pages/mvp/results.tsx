import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import { useRouter } from "next/router";
import { newGameClickedListener } from "../../utils/firebase-utils/firebase-util";
import { resetGame } from "../../utils/firebase-utils/firebase-util";
import {
  endSessionClicked,
  everyoneWentListener,
  getApplerForRound,
  resetRoom,
  gameResets,
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
    query: { userName, roomID },
  } = router;

  const [captionVotes, setCaptionVotes] = useState({});

  useEffect(() => {
    fetchCaptionVoteObject(Number(roomID)).then((captionVotes) => {
      setCaptionVotes(captionVotes);
    });
  }, [roomID]);

  const [applerUsername, setApplerUsername] = useState("");

  useEffect(() => {
    getApplerForRound(Number(roomID)).then((applerUsername) => {
      setApplerUsername(applerUsername);
    });
  }, [roomID]);

  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    fetchApplerImageURL(Number(roomID)).then((imgURL) => {
      setImgURL(imgURL);
    });
  }, [roomID]);

  const [newGame, setNewGame] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const result = await gameResets(Number(roomID));
      setNewGame(result);
    };
    fetch();
  }, [roomID]);

  useEffect(() => {
    nextRoundHasBeenClicked(Number(roomID), () =>
      navToLobby(String(userName), Number(roomID))
    );
  }, [roomID, userName]);

  useEffect(() => {
    everyoneWentListener(Number(roomID), () => navToHome(Number(roomID)));
  }, [roomID]);

  useEffect(() => {
    newGameClickedListener(Number(roomID), () =>
      navToLobby(String(userName), Number(roomID))
    );
  }, [userName, roomID]);
  
  const waves = "/waveboi.png";

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
      <div>
        {newGame ? (
          <div>
            <button onClick={() => resetGame(Number(roomID))}>New Game</button>
            <button onClick={() => endSessionClicked(Number(roomID))}>
              End Session
            </button>
          </div>
        ) : (
          <button onClick={() => nextRound(Number(roomID))}>Next Round</button>
        )}
      </div>
      <Image
        src={waves}
        width={2400}
        height={400}
        alt="waves at the bottom of the screen"
        className="waveslobby"
      />
    </main>
  );
};

export default Results;
