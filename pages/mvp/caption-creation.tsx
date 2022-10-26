import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { fetchApplerImageURL } from "../../utils/firebase-utils/firebase-util";
import { uploadCaption } from "../../utils/firebase-utils/firebase-util";
import { getApplerForRound } from "../../utils/firebase-utils/firebase-util";
import { everyoneCreatedACaptionListener } from "../../utils/firebase-utils/firebase-util";

const CaptionCreation: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode, URL },
  } = router;
  const props = {
    userName,
    roomID,
    roomCode,
    URL
  };

  async function checkIfApplerWentToWait(){
    const applerName = await getApplerForRound(Number(roomID))
    
      if(applerName == userName){
        await Router.push({
          pathname: "/mvp/appler-wait",
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
  checkIfApplerWentToWait()
})
  
  async function navToVote() {
    await Router.push({
      pathname: "/mvp/vote",
      query: {
        userName,
        roomID,
        roomCode,
        caption,
        URL
      },
    });
  }

  const [caption, setCaption] = useState("");

  const inputCaption = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCaption(event.target.value);
  };

  const [imgURL, setImgURL] = useState("")

  useEffect(() => {
    fetchApplerImageURL(Number(roomID)).then(imgURL => {
      setImgURL(imgURL)
    })
      return() => {imgURL}
  })

  function uploadCaptionNavToVote () {
    if(caption != null){
    uploadCaption(caption, String(userName), Number(roomID));
    navToVote();
    }
  }

  const [applerUsername, setApplerUsername] = useState("")

  useEffect(() => {
    getApplerForRound(Number(roomID)).then(applerUsername =>
      setApplerUsername(applerUsername))
      return() => {applerUsername}
  })

  useEffect(() => {
    everyoneCreatedACaptionListener(Number(roomID), navToVote);
  })

  return (
    <main>
      <h1>Caption the image</h1>
      <h3>Room {roomID}</h3>
      <h3>Appler: { applerUsername }</h3>
      <h4>This is the picture { applerUsername } generated</h4>
      <div>
        <Image src={imgURL} width={100} height={100} alt="Pretty Picture"></Image>
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
        <button onClick={() => uploadCaptionNavToVote()}>submit</button>
      </div>
    </main>
  );
};

export default CaptionCreation;
