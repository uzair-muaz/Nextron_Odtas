import React from 'react'
import { RiVideoUploadFill } from 'react-icons/ri';
import Loading from './Loading';
import { useState, useEffect } from "react"

function FileUpload(props) {
    const StateChanger = props.stateChanger;
    // var buttonPressed = false;

    const [buttonPressed, setbuttonPressed] = useState("False");
    const [fileSelected, setFileSelected] = useState();





    useEffect(() => {

    }, [buttonPressed, fileSelected])

    // function checkFile() {
    //     console.log("In checkfile")
    //     if(document.getElementById('uploadFile').files[0] !== undefined){
    //         console.log("In if")
    //         setFileSelected(document.getElementById('uploadFile').files[0])
    //     }
    //     else{
    //         console.log("in else")
    //     }
    // }

    const apiCall = async () => {
        console.log("iN API CALL FUNCTION")
        if (fileSelected !== undefined) {
            const formData = new FormData();
            formData.append('file', fileSelected);
            var response = await fetch("http://localhost:8000/uploadvideo", {
                method: 'POST',
                body: formData
            })
            console.log(response)
            if (response.status == 200) {

                setbuttonPressed('False');
                console.log(buttonPressed);
                setFileSelected(undefined)

            }
            else {
                setbuttonPressed('False');
                setFileSelected(undefined)
            }
        }
        else {
            alert("Please Select a file !")
            console.log('Upload Video Not Called')
            setbuttonPressed("False")
        }
        // StateChanger.setDisabled(false);

    }
    return (

        //Complete area For upload video 
        <div className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-slate-200 h-full'>


            {
                (buttonPressed === "True")
                    // onMouseMove={handleMouseMove}
                    ? <div className='bg-slate-50 md:text-base lg:text-lg  rounded-2xl shadow-2xl w-full h-2/3  flex flex-col items-center justify-center'><Loading /></div>
                    : <div className='bg-slate-50 md:text-base lg:text-lg  rounded-2xl shadow-2xl w-full h-2/3  flex flex-col items-center justify-center'>
                        {/* Inner card type box */}


                        {/* Light Dotted box  */}
                        <div className='bg-slate-200 border-4 border-slate-700 border-dashed  w-9/12  rounded-2xl p-10 '>

                            {/* Icon box  */}
                            <div className=' flex flex-col items-center justify-center py-1'>
                                <RiVideoUploadFill size='50px' className='text-slate-700 ' />
                            </div>

                            {/* Text box  */}
                            <div className=' flex flex-col items-center justify-center py-1'>
                                <h1 > Select video to upload for detections</h1>
                            </div>

                            {/* File Select box  */}
                            <div className=' flex items-center justify-center py-2'>
                                <input onChange={(e) => {
                                    setFileSelected(e.target.files[0])
                                }} type='file' id='uploadFile' className='ml-[15%]' accept='mp4 avi' />
                            </div>

                            {/* Button box  */}
                            <div className=' flex flex-col items-center justify-center py-2' >
                                <button type='file' className="bg-sky-200 hover:bg-sky-300 py-2 px-4 border hover:border-black rounded-full" onClick={() => {

                                    console.log('in function on click')

                                    setbuttonPressed("True")
                                    apiCall();
                                    // setbuttonPressed("False");
                                    // console.log("set button should be false == "+ buttonPressed)
                                }}>
                                    Upload File
                                </button>
                            </div>

                        </div>
                    </div>
            }


        </div>
    )
}

export default FileUpload