import React from 'react'
import { useState, useEffect } from "react"



function LiveStream(props) {
  const data = props.formData;
  
  useEffect(() => {
    const formDataPost = async () => {
      const {camera, detection, tracking, recording} = data 
      console.log(camera, detection, tracking, recording)
        const response = await fetch("http://localhost:8000/video/requests", {
          method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        });

    }
    formDataPost();

}, [props.formData])
   return (

<div className=' w-[100%] h-[100%] ' >
    <img src={"http://localhost:8000/video"}  alt="Loading the stream..." className='w-full h-full text-2xl' />


</div>

  );
}

export default LiveStream