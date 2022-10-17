import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// import { Routes, Route, useNavigate } from "react-router-dom";
import Router from "next/router";
import { SetStateAction, useState } from "react";
import {
  createRoom,
  everyoneCastAVoteListener,
  everyoneCreatedACaptionListener,
  everyoneGeneratedAnImageListener,
  fetchListOfCaptions,
  fetchListOfImageURL,
  fetchVoteList,
  getApplerUsername,
  getUserList,
  joinRoom,
  nextRound,
  startedGameListener,
  startRound,
  uploadCaption,
  uploadImageURL,
  uploadPrompt,
  userListChangedListener,
  vote,
} from "../../utils/firebase-utils/firebase-util";

const testFunc = async function test(): Promise<void> {
  console.log("yeah");
};

const Home: NextPage = () => {
  const callBack1 = () => {
    createRoom(100);
    console.log("rooms created");
  };
  const callBack2 = () => {
    everyoneGeneratedAnImageListener(100, testFunc);
  };
  const callBack3 = () => {
    joinRoom("John", 100);
    console.log("joined");
  };
  const callBack4 = () => {
    uploadImageURL("123.jpg", "Bob", 100);
    console.log("url uploaded");
  };
  const callBack5 = () => {
    uploadPrompt(100, "Bob", "banana");
    console.log("prompt uploaded");
  };
  const callBack6 = () => {
    uploadCaption("caption", "CaptionAuthor", 100);
  };
  const callBack7 = () => {
    vote("CaptionAuthor", 100);
  };

  return (
    <main>
      <button onClick={() => callBack1()}>Button 1</button>
      <button onClick={() => callBack2()}>Button 2</button>
      <button onClick={() => callBack3()}>Button 3</button>
      <button onClick={() => callBack4()}>Button 4</button>
      <button onClick={() => callBack5()}>Button 5</button>
      <button onClick={() => callBack6()}>Button 6</button>
      <button onClick={() => callBack7()}>Button 7</button>
    </main>
  );
};

export default Home;
