import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  return (
    <div className="h-screen">
      {Component.name == 'Home' ? (
        <div></div>
      ) : Component.name == 'Login' ? (
        <div></div>
      ) : (
        <div className="h-[9%]">
          <Navbar />
        </div>
      )}

      <div className="h-[91%]">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
