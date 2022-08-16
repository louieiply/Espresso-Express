import React from 'react';
import bgimg from '../images/bg.jpg';
import { Link } from "react-router-dom";
import "../components/css/home.css";
import "../components/js/home.js"
const Home = () => {

  return (

    <main>
      <div className='hero-image flex justify-center items-center h-full'>
        <h1 className='hero-text'>
          <p className="typewrite" data-period="2000" data-type='[ "Welcome to Espressso Express.", "Hope you will find what you need", "Be happy", "and enjoy :)" ]'>
            <span className="wrap"></span>
          </p>
        </h1>
          <div className="text-center text-white px-6 md:px-12 mt-60">
            <Link to="/Products">
              <button
                type="button"
                className="inline-block px-6 py-3 border-2 border-white text-white font-medium text-sm leading-snug uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              > 
              View our goods
              </button>
            </Link>
          </div>
      </div>
    </main>
  );
};

export default Home;
