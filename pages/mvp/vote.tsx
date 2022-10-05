import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import { useRouter } from "next/router";

const Vote: NextPage = () => {
  const router = useRouter();
  const {
    query: { userName, roomID, roomCode, caption, imgURL },
  } = router;
  const props = {
    userName,
    roomID,
    roomCode,
    caption,
    imgURL
  };

  const img = "/pretty-picture.jpg";

  // function displayCaptions() {
  //   return playerCaptions.map(({ caption, author }) => (
  //     <div key={author}>
  //       <button onClick={() => onButtonClick(author)}>{caption}</button>
  //     </div>
  //   ));
  // }

  // function onButtonClick(personVotedFor: string) {
  //   //supply user (playing) and who they voted for
  //   //user: props.userName
  //   console.log(props.userName);
  //   console.log(personVotedFor);
  // }

  let votes = 0;

  function navToResults() {
    votes += 1;
    Router.push({
      pathname: "/mvp/results",
      query: {
        userName,
        roomID,
        roomCode,
        imgURL,
        caption,
        votes
      },
    });
  }

  return (
    <main>
      <h1>Voting</h1>
      <h3>Room {roomID} {roomCode}</h3>
      <h3>Appler: {props.userName}</h3>
      <h4>This is the picture {userName} generated</h4>
      <Image src={img} width={100} height={100} alt="Pretty Picture" />
      <h4>These are the captions the players came up with</h4>
      <h4>Vote for your favorite caption!</h4>
      <div>
        <button onClick={() => navToResults()}>{props.caption}</button>
      </div>
      {/* <div>
        <button onClick={() => navToResults()}>Results</button>
      </div> */}
    </main>
  );
};

export default Vote;
