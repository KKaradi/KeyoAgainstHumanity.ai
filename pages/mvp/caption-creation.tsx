import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import useRouter from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { fetchApplerImageURL } from "../../utils/firebase-utils/firebase-util";
import { uploadCaption } from "../../utils/firebase-utils/firebase-util";
import { getApplerForRound } from "../../utils/firebase-utils/firebase-util";
import { everyoneCreatedACaptionListener } from "../../utils/firebase-utils/firebase-util";

async function navToVote(userName: string, roomID: number, caption: string, URL: string) {
  await Router.push({
    pathname: "/mvp/vote",
    query: {
      userName,
      roomID,
      caption,
      URL,
    },
  });
}

const CaptionCreation: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode, URL },
  } = router;

  const [caption, setCaption] = useState("");

  const inputCaption = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCaption(event.target.value);
  };

  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    fetchApplerImageURL(Number(roomID)).then((imgURL) => {
      setImgURL(imgURL);
    });
  }, [roomID]);

  const [applerUsername, setApplerUsername] = useState("");

  useEffect(() => {
    getApplerForRound(Number(roomID)).then((applerUsername) => {
      setApplerUsername(String(applerUsername))
    });
  }, [roomID])

  useEffect(() => {
    everyoneCreatedACaptionListener(Number(roomID), () => navToVote(String(userName), Number(roomID), String(caption), String(URL)));
  }, [URL, caption, roomID, userName]);

  return (
    <main>
      <h1>Caption the image</h1>
      <h3>Room {roomID}</h3>
      <h3>Appler: {applerUsername}</h3>
      <h4>This is the picture {applerUsername} generated</h4>
      <div>
        <Image
          src={imgURL}
          width={100}
          height={100}
          alt="Pretty Picture"
        ></Image>
      </div>
      <h4>Caption this picture!</h4>
      <div>
        <input
          type="text"
          id="message"
          name="message"
          onChange={inputCaption}
          value={caption}
        />
      </div>
      <div>
        <button onClick={() => uploadCaption(String(caption), String(userName), Number(roomID))}>submit</button>
      </div>
    </main>
  );
};

export default CaptionCreation;
