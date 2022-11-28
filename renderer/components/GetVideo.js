import React from 'react'
import { useState, useEffect } from "react"
import Videos from './Videos'
import { useRouter } from 'next/router'

function GetVideo() {

  const [videos, setVideos] = useState([])
  const router = useRouter();
  // const [count , setCount] = useState(1)
  useEffect(() => {
   

    const fetchVideos = async () => {
      const response = await fetch("http://localhost:3000/videos/getVideos", {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      })
      console.log(response.status);
      if (response.status != 200) {
        console.log("in if")
        console.log('redirecting to detection');
        // router.push('/detection')
      }
      else {
        console.log("in else")
        const data = await response.json();
        var dummy = data;
        
        // dummy.push(...data, data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0], data[0])
        // console.log(dummy)
        setVideos(data)
      }
    }
    fetchVideos()
  }, [])



  // const fetchMoreData = () => {
  //   console.log("abc")
  //   setCount(count++);
  // };

  //The array is added is useEffect to add dependency to just run the function only once on the first render in line 20 

  return (

    <div className="container mx-auto px-5 bg-slate-200 ">
      <h1 className="text-slate-800 font-bold text-3xl pt-[2%] pb-[2%] text-center">
        Videos saved By you
      </h1>

      {!videos ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        // // <InfiniteScroll
        //   dataLength={videos.length}
        //   next={fetchMoreData}
        //   hasMore={count !== videos.length}
        //   loader={<h4>Loading...</h4>}
        // >
          <section className="grid gap-5 grid-cols-3 pb-20 container">
            {videos.map((video) => (
              <Videos key={video.id} {...video} />
            ))}
          </section>
        // </InfiniteScroll> 
      )}
    </div>

  )
}

export default GetVideo