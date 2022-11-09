import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchApplerImageURL } from "../../utils/firebase-utils/firebase-util";
import { everyoneCreatedACaptionListener } from "../../utils/firebase-utils/firebase-util";

async function navToVote(userName: string, roomID: number, URL: string) {
  await Router.push({
    pathname: "/mvp/vote",
    query: {
      userName,
      roomID,
      URL,
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
    everyoneCreatedACaptionListener(Number(roomID), () =>
      navToVote(String(userName), Number(roomID), String(URL))
    );
  }, [URL, roomID, userName]);

  const waves = "/waveboi.png";
  const top = "/top.png";

  return (
    <main>
      <Image
        src={top}
        width={10000}
        height={600}
        alt="shapes top header"
        className="top"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <ul className="flex-container">
        <li className="appler-flex">
          <div className="lobbyImage">
            <Image
              src={imgURL}
              width={400}
              height={400}
              alt="Pretty Picture"
            ></Image>
          </div>
        </li>
      </ul>
      <div>
        <h1 className="sit">SIT TIGHT WHILE EVERYONE CAPTIONS YOUR IMAGE!</h1>
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

export default ApplerWait;
