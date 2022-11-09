import type { NextPage } from "next";
import Router from "next/router";

function goToHome() {
  Router.push({
    pathname: "/mvp/home",
  });
}

const Home: NextPage = () => {
  return (
    <div>
      <button onClick={() => goToHome()}>Home Page</button>
    </div>
  );
};

export default Home;
