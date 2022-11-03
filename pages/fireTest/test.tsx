import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// import { Routes, Route, useNavigate } from "react-router-dom";
import Router from "next/router";
import { SetStateAction, useState } from "react";
import {
  createRoom,
  everyoneCreatedACaptionListener,
  fetchListOfCaptions,
  fetchListOfImageURL,
  fetchCaptionVoteObject,
  getApplerForRound,
  getUserList,
  joinRoom,
  nextRound,
  resetRoom,
  startedGameListener,
  startGame,
  uploadCaption,
  uploadImageURL,
  uploadPrompt,
  vote,
  userListChangedListener,
  everyoneCastAVoteListener,
  everyoneGeneratedAnImageListener,
} from "../../utils/firebase-utils/firebase-util";

export async function testCallbackFunc() {
  console.log("Everyone has voted");
}

const testCallback = () => testCallbackFunc();

const Home: NextPage = () => {
  const callBack1 = () => {
    createRoom(100);
    console.log("rooms created");
  };
  const callBack2 = () => {
    everyoneCastAVoteListener(100, testCallback);
    console.log('everyoneCastAVoteListener has started')
  };
  const callBack3 = () => {
    joinRoom("Billy", 100);
    console.log("joined");
  };
  const callBack4 = () => {
    uploadImageURL("123.jpg", "John", 100);
    console.log("url uploaded");
  };
  const callBack5 = () => {
    uploadPrompt(100, "John", "banana");
    console.log("prompt uploaded");
  };
  const callBack6 = () => {
    uploadCaption("long yellow thing(this is also a caption)", "Jimmy", 100);
  };
  const callBack7 = () => {
    vote("John", 100);
    console.log('John Voted')
  };
  const callBack8 = () => {
    nextRound(100)
  };
  const callBack9 = () => {
    vote("Jimmy", 100)
    console.log("Jimmy voted")
  };
  const callBack10 = async () => {
    let x = await getApplerForRound(100)
    console.log(x)
    console.log("Button 10 has been clicked");
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
      <button onClick={() => callBack8()}>Button 8</button>
      <button onClick={() => callBack9()}>Button 9</button>
      <button onClick={() => callBack10()}>Button 10</button>
    </main>
  );
};

export default Home;
