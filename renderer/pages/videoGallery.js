
import GetVideo from '../components/GetVideo';
import React from 'react'
import Navbar from '../components/Navbar';


function VideosGallery() {


    return (
        <div className='bg-slate-200 h-full '>

            {/* Containter for Video Elements */}
            <div className='h-screen w-screen'>
                <div className=' h-[9%] '>
                    <Navbar></Navbar>
                </div>
                <div className=' h-[91%] '>
                    <GetVideo />
                </div>
            </div>

        </div>
    )
}

export default VideosGallery