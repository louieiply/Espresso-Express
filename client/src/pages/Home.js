import React from 'react';
import bgimg from '../images/bg.jpg';
const Home = () => {

  return (

    <main>
      <img src={bgimg} alt="bg image" title="coffee image"/>
      <div className="flex-row justify-center">
        homepage
      </div>
      <h1 className="text-3xl font-bold underline">
      Hello world!
      </h1>
    </main>
  );
};

export default Home;
