import React from 'react'
import Map from '../components/Map';
import Toggle from '../components/Toggle';
import LiveStream from '../components/LiveStream';
import { BiVideoRecording } from 'react-icons/bi';
import { RiScreenshot2Fill } from 'react-icons/ri';
import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import FileUpload from '../components/FileUpload';


function Detection() {
    const [detection, setDetection] = useState(false);
    const [camera, setCamera] = useState(false);
    const [tracking, setTracking] = useState(false);
    const [recording, setRecording] = useState(false);

    //to disable the buttons
    const [disabled, setDisabled] = useState(false);

    //Position of mouse
    const [globalMousePos, setGlobalMousePos] = useState({});
    const [localMousePos, setLocalMousePos] = useState({});

    const handleMouseMove = (event) => {
        //  Get mouse position relative to element
        const localX = event.clientX - event.target.offsetLeft;
        const localY = event.clientY - event.target.offsetTop;

        setLocalMousePos({ x: localX, y: localY });
    };



    const router = useRouter();




    useEffect(() => {
        //Api to get verifyUser and get userDetails
        const authorizeUser = async () => {
            const response = await fetch("http://localhost:3000/auth/getuser", {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            })

            if (response.status != 200) {
                router.push('/')
            }
        };
        authorizeUser();

        const handleMouseMove = (event) => {
            setGlobalMousePos({
                x: event.clientX,
                y: event.clientY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove',handleMouseMove);
        }

    }, [])


    const formData = { camera, detection, tracking, recording };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { camera, detection, tracking, recording };
        fetch("http://localhost:8000/video/requests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
    }

    console.log('Global = '+globalMousePos.x + " "+globalMousePos.y )
    console.log('Local = '+localMousePos.x + " "+localMousePos.y)


    return (


        // Most outer container that holds the nav bar and the containter for dashboard
        <div className='bg-slate-50 h-full '>

            {/* Navbar  */}
            {/* <div className='h-[10%]'><Navbar /></div> */}

            {/* Containter for Dashboard Elements */}
            <div className=' h-[100%] flex'>

                {/* Container 1 for Toggle Buttons and Detection Filteration options */}
                <div className='w-[20%] h-full border-gray-600  border-2'>

                    {/* Video Options  */}
                    <h1 className=' mt-[5%] mb-[10%] text-xl text-center '>Video Options</h1>
                    {/* containter containing text and toggle for livestream  */}
                    <div className='flex h-[5%] items-center mt-[5%] ' >
                        <div className='ml-[10%] text-base w-[50%]'> LiveStream </div>
                        <div onClick={() => { if (disabled == false) { setCamera(!camera) } }} className='h-[70%] w-[15%]  ml-[15%]'> <Toggle toggleState={camera} /> </div>
                    </div>

                    {/* containter containing text and toggle for Detection  */}
                    <div className='flex h-[5%] items-center mt-[5%] ' >
                        <div className='ml-[10%] text-base w-[50%]'> Detection </div>
                        <div onClick={() => { if (disabled == false) { setDetection(!detection) } }} className='h-[70%] w-[15%]  ml-[15%]'> <Toggle toggleState={detection} /> </div>
                    </div>
                    {/* containter containing text and toggle for Tracking  */}
                    <div className='flex h-[5%] items-center mt-[5%] ' >
                        <div className='ml-[10%] text-base w-[50%]'> Tracking </div>
                        <div onClick={() => { if (disabled == false) { setTracking(!tracking) } }} className='h-[70%] w-[15%]  ml-[15%]'> <Toggle toggleState={tracking} /> </div>
                    </div>

                    {/* Filterteration options */}
                    <h1 className=' mt-[25%] mb-[10%] text-xl text-center '>Filteration Options</h1>

                    {/* containter containing text and toggle for Detection  */}
                    <div className='flex h-[5%] items-center mt-[5%]' >
                        <div className='ml-[10%] text-sm w-[50%]'> All </div>
                        <input id="default-checkbox" type="checkbox" value="" className=" accent-sky-300 h-[60%] w-[15%]  ml-[15%]" />
                    </div>

                    {/* containter containing text and toggle for Detection  */}
                    <div className='flex h-[5%] items-center mt-[5%]' >
                        <div className='ml-[10%] text-sm w-[50%]'> HTV </div>
                        <input id="default-checkbox" type="checkbox" value="" className=" accent-sky-300 h-[60%] w-[15%]  ml-[15%]" />
                    </div>

                    {/* containter containing text and toggle for Detection  */}
                    <div className='flex h-[5%] items-center mt-[5%]' >
                        <div className='ml-[10%] text-sm w-[50%]'> LTV </div>
                        <input id="default-checkbox" type="checkbox" value="" className=" accent-sky-300 h-[60%] w-[15%]  ml-[15%]" />
                    </div>

                    {/* containter containing text and toggle for Detection  */}
                    <div className='flex h-[5%] items-center mt-[5%]' >
                        <div className='ml-[10%] text-sm w-[50%]'> Pedestrian </div>
                        <input id="default-checkbox" type="checkbox" value="" className=" accent-sky-300 h-[60%] w-[15%]  ml-[15%]" />
                    </div>

                    {/* containter containing text and toggle for Detection  */}
                    <div className='flex h-[5%] items-center mt-[5%]' >
                        <div className='ml-[10%] text-sm w-[50%]'> Motor / Bikes </div>
                        <input id="default-checkbox" type="checkbox" value="" className=" accent-sky-300 h-[60%] w-[15%]  ml-[15%]" />
                    </div>

                </div>

                {/* Containter 2 divided into 2 blocks one for live stream and one for record options */}
                <div className='w-[60%]  border-y-gray-600 border-x-slate-50 border-2 '>
                    {/* Record And Screen Capture Options */}
                    <div className="h-[9.9%] flex  justify-center items-center">
                        <div className='bg-sky-200 hover:bg-sky-300 flex items-center p-2 pr-4 rounded-full border hover:border-black' >
                            <BiVideoRecording className=' mr-2 ml-1' />
                            <label className='text-sm '> Start / Stop Recording </label>
                        </div>
                        <div className='bg-sky-200 hover:bg-sky-300 flex items-center p-2 pr-4 rounded-full ml-[20%] border hover:border-black'>
                            <RiScreenshot2Fill className=' mr-2 ml-1' />
                            <label className='text-sm '> Capture Screen </label>
                        </div>
                    </div>
                    {/* LiveStream Container */}
                    {
                        (camera)
                            ? <div className="h-[90%] bg-slate-300 border-y-2 border-gray-600 " onMouseMove={handleMouseMove}><LiveStream formData={formData} /></div>
                            : <div className="h-[90%] bg-slate-300 border-t-2  border-gray-600 text-center text-2xl" onMouseMove={handleMouseMove}><FileUpload /></div>
                    }

                </div>

                {/* Container 3 divided into 2 blocks one for maps and one for Tracking ID's */}
                <div className='w-[20%] bg-white border-gray-600  border-2'>
                    <div className="h-[55%]  mb-[1%] bg-slate-50 text-center p-[5%] overflow-auto ">
                        <h1 className='text-2xl mb-[2%] '>Tracking ID's</h1>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]' >Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]' >Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]' >Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]' >Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]' >Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]' >Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>
                        <h2 className='border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]'>Tracking id 1</h2>

                    </div>
                    <div className="h-[44%] "> <Map /> </div>

                </div>
            </div>
        </div>
    )
}

export default Detection