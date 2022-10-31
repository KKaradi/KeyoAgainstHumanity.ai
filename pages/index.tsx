import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router from "next/router";

function goToHome(){
  Router.push({
    pathname: "/mvp/home"
  });
}

const Home: NextPage = () => {
  return (
    <div><button onClick={() => goToHome()}>Home Page</button>
    </div>
  )
}

export default Home