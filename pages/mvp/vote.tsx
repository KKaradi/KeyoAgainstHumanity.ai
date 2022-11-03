import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  fetchListOfCaptions,
  getApplerForRound,
  vote,
} from "../../utils/firebase-utils/firebase-util";
import { fetchApplerImageURL } from "../../utils/firebase-utils/firebase-util";
import { everyoneCastAVoteListener } from "../../utils/firebase-utils/firebase-util";

function navToResults(URL: string, userName: string, roomID: number, caption: string) {
  Router.push({
    pathname: "/mvp/results",
    query: {
      userName,
      roomID,
      URL,
      caption,
    },
  });
}

const Vote: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, caption, URL },
  } = router;

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

  const [captionList, setCaptionList] = useState([""]);

  useEffect(() => {
    fetchListOfCaptions(Number(roomID)).then((captionList) => {
      setCaptionList(captionList);
    });
  })

  useEffect(() => {
    everyoneCastAVoteListener(Number(roomID), () => navToResults(String(URL), String(userName), Number(roomID), String(caption)));
  }, [URL, caption, roomID, userName]);

  return (
    <main>
      <h1>Voting</h1>
      <h3>Room {roomID}</h3>
      <h3>Appler: {applerUsername}</h3>
      <h4>This is the picture {applerUsername} generated</h4>
      <Image src={imgURL} width={100} height={100} alt="Pretty Picture" />
      <h4>These are the captions the players came up with</h4>
      <h4>Vote for your favorite caption!</h4>
      <div><div>
        {captionList.map((caption) => (
          <button key={caption} onClick={() => vote(caption, Number(roomID))}>
            {caption}
          </button>
        ))}
      </div></div>
    </main>
  );
};

export default Vote;
