import React from 'react'
import Image from 'next/image'
import GoogleMapReact from 'google-map-react'
function Map() {

  const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 33.65282206344945,
    lng: 73.15711403601989,
  }
  return (
    <div className='h-full relative '>

      {/* <Image
              src='/images/Map.png'
              alt='/'
              width="100%" height="100%" layout="fill" 
              className='rounded-xl  '
              
                        
          /> */}

      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBhlfT-c_9fCJRJ0kzK-_5wN9I6VBf5l9M' }}
        defaultCenter={location}
        defaultZoom={13}
      >
      
      </GoogleMapReact>



    </div>
  )
}

export default Map