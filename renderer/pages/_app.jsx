import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="h-screen">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
