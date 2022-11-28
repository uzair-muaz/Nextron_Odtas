import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  // console.log(Component)
  console.log(Component.name)
  

  return <div className='h-screen'>
        {/* {
      (Component.name != "Home") 
        ? <div className='h-[10%]' ><Navbar /></div>
        : <div></div>
    } */}

        {
          (Component.name == "Home") ? <div></div>
            : (Component.name == "Login") ? <div></div>
              : <div className='h-[10%]' ><Navbar /></div>
        }

        <div className='h-[90%]' ><Component {...pageProps} /></div>

      </div>
}

export default MyApp;
