import React from 'react'
import ReactPlayer from 'react-player/lazy'


function Videos(props) {

    
    return (
        // Outer div controlling the card 
        <div className="px-5 w-[100%] h-[100%] rounded-sm shadow-md bg-slate-100">
           
            {/* Div containing the react player */}
            <div className='mt-5'>
            <ReactPlayer url={props.url}
                className='react-player  '
                width='100%'
                height='80%'
                volume={1}
                controls={true}
            />
            </div>

            {/* Div containing the video info  */}
            <div className=' mt-[3%] mb-[3%]'>
                <ul className='flex justify-between'>
                    <li className="text-sm text-slate-800 font-bold">Title : {props.name} </li>
                    <li className="text-sm text-slate-800 font-bold ">Date : {props.createdAt}</li>
                </ul>
            </div>

        </div>
    )
}

export default Videos