import React from 'react'
import { RiVideoUploadFill } from 'react-icons/ri';


function FileUpload() {

    const apiCall = async() => {
        var videoFile = document.getElementById('file').files[0];
        if(videoFile !== undefined){
            const formData = new FormData();
            formData.append('file',videoFile);
            console.log(videoFile)
            const response = await fetch("http://localhost:8000/uploadvideo", {
                method: 'POST',
                body: formData
            })
        }
        else{
            console.log('Upload Video Not Called')
        }

        
        
    }
    return (
            //Complete area For upload video 
        <div className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-slate-200 h-full'>

            {/* Inner card type box */}
            <div className='bg-slate-50 md:text-base lg:text-lg  rounded-2xl shadow-2xl w-full h-2/3  flex flex-col items-center justify-center'>
                 
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
                        <input type='file' id='file' className='ml-[15%]' accept='mp4 avi'/>                          
                    </div>

                    {/* Button box  */}
                    <div className=' flex flex-col items-center justify-center py-2' >
                        <button type='file' className="bg-sky-200 hover:bg-sky-300 py-2 px-4 border hover:border-black rounded-full" onClick={apiCall}>
                            Upload File
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default FileUpload