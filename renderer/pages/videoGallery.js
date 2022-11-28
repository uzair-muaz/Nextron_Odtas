
import GetVideo from '../components/GetVideo';
import React from 'react'


function VideosGallery() {
   

    return (
        <div className='bg-slate-200 h-full '>

            {/* Containter for Video Elements */}
            <div className=' h-[100%] '>
                <GetVideo/>
            </div>

        </div>
    )
}

export default VideosGallery