import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import { useRouter } from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import { fetchApplerImageURL } from "../../utils/firebase-utils/firebase-util";
import { uploadCaption } from "../../utils/firebase-utils/firebase-util";
import { getApplerForRound } from "../../utils/firebase-utils/firebase-util";
import { everyoneCreatedACaptionListener } from "../../utils/firebase-utils/firebase-util";

async function navToVote(
  userName: string,
  roomID: number,
  caption: string,
  URL: string
) {
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
    query: { userName, roomID, URL },
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
      setApplerUsername(applerUsername);
    });
  }, [roomID]);

  useEffect(() => {
    everyoneCreatedACaptionListener(Number(roomID), () =>
      navToVote(String(userName), Number(roomID), String(caption), String(URL))
    );
  }, [URL, caption, roomID, userName]);

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
        <li className="lobby-flex">
          <h1>CAPTION {applerUsername}&#39;S PAINTING!</h1>
          <div>
            <Image
              src={imgURL}
              width={400}
              height={400}
              alt="Pretty Picture"
            ></Image>
          </div>
        </li>
      </ul>
      <div className="title">
        <p>CAPTION THIS PICTURE!</p>
      </div>
      <div className="cap">
        <input
          className="captiontxt"
          type="text"
          id="message"
          name="message"
          onChange={inputCaption}
          value={caption}
        />
      </div>
      <div>
        <button
          onClick={() =>
            uploadCaption(String(caption), String(userName), Number(roomID))
          }
        >
          submit
        </button>
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

export default CaptionCreation;
