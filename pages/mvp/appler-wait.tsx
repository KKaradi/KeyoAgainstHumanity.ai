import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import useRouter from "next/router";
import { useState, useEffect } from "react";
import { fetchApplerImageURL } from "../../utils/firebase-utils/firebase-util";
import { everyoneCreatedACaptionListener } from "../../utils/firebase-utils/firebase-util";

async function navToVote(userName: string, roomID: number, URL: string) {
  await Router.push({
    pathname: "/mvp/vote",
    query: {
      userName,
      roomID,
      URL
    },
  });
}

const ApplerWait: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, URL },
  } = router;

  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    fetchApplerImageURL(Number(roomID)).then((imgURL) => {
      setImgURL(imgURL);
    });
  }, [roomID]);

  useEffect(() => {
    everyoneCreatedACaptionListener(Number(roomID), () => navToVote(String(userName), Number(roomID), String(URL)));
  }, [URL, roomID, userName]);

  return (
    <main>
      <h1>Sit tight while everyone captions your image!</h1>
      <div>
        <Image
          src={imgURL}
          width={100}
          height={100}
          alt="Pretty Picture"
        ></Image>
      </div>
    </main>
  );
};

export default ApplerWait;
