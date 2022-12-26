import { FaEnvelope, FaLock } from 'react-icons/fa';
import { BiErrorCircle } from 'react-icons/bi';
import NextImage from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router'


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [check, setCheck] = useState("");

    const router = useRouter()



    const handleSubmit = async (e) => {
        // Prevents the page from reloading 
        e.preventDefault();
        const response = await fetch("http://localhost:3000/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });
        const json = await response.json()
        console.log(json);

        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            console.log(json.authtoken)
            if (json.userType === 'admin') {
                alert("Admin cant login as an operator  ")
                router.push('/')
            }
            else {

                const response = await fetch("http://localhost:3000/auth/getuser", {
                    method: 'POST',
                    headers: {
                        'auth-token': localStorage.getItem('token')
                    }
                })

                var jsonResponse = await response.json();
                let userID = jsonResponse._id.toString();
                let userDrone = jsonResponse.Drone_ID.toString();

                console.log("===============================")
                console.log("UserID = " + userID);
                console.log("UserDrone = " + userDrone);
                console.log("===============================")

                let fastServer = { operator_id: userID, operator_drone_id: userDrone };
                const userDetails = await fetch("http://localhost:8000/send_operator_info", {
                    method: 'POST',
                    body: JSON.stringify(fastServer),
                })

                router.push('/dashboard')
            }
        }
        else {
            setCheck(json.errorType);
        }


    }

    return (
        //Main contain which conatins the login card and bg-color 
        <div className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-[rgba(138,138,140,255)] h-screen'>


            <div className='bg-white md:text-base lg:text-lg  rounded-2xl shadow-2xl flex w-2/3 h-2/3 '>

                <div className='w-2/5 p-5'>
                    {/* Sign in message and underline */}
                    <div className='px-10'>
                        <h1 className='md:text-base lg:text-lg xl:text-xl text-slate-700 font-bold  md:mt-[30%] md:mb-[10%] lg:mt-[25%]  lg:mb-[4%]'>Sign in to ODTAS</h1>
                        <div className='border-2 w-[30%] lg:mb-[4%] md:mb-[4%] border-slate-700 inline-block'></div>
                    </div>

                    {/* Email cell */}
                    <div className='flex flex-col items-center  lg:mt-[10%] lg:mb-[10%] md:mt-[5%] md:mb-[10%]'>
                        <div className='w-[100%] bg-gray-200 md:p-[6px] lg:p-2 rounded-lg md:text-xs lg:text-sm items-center flex ' >
                            <FaEnvelope className='text-slate-700 mr-2 ml-1' />
                            <input type="email" name='email' placeholder='Email' onChange={(text) => setEmail(text.target.value)} className='bg-gray-200 md:text-xs outline-none lg:text-sm  flex-1 w-[100%] text-slate-700' />

                        </div>

                        {/* Error Display for Email*/}
                        {
                            (check === "email")
                                ? <div className='w-[100%] md:text-xs lg:text-sm items-center flex' >
                                    <BiErrorCircle className='text-red-600 md:text-sm lg:text-xs mr-2 ml-1 mt-1' />
                                    <label className='md:text-xs text-red-600 mt-1  '> Invalid Account </label>
                                </div>
                                : <div></div>
                        }

                    </div>



                    {/* Password cell */}
                    <div className='flex flex-col items-center lg:mb-[3%] md:mb-[4%]'>
                        <div className='w-[100%] bg-gray-200 md:p-[6px] lg:p-2 rounded-lg md:text-xs lg:text-sm items-center flex' >
                            <FaLock className='text-slate-700 mr-2 ml-1' />
                            <input type="password" name='password' placeholder='Password' onChange={(text) => setPassword(text.target.value)} className='bg-gray-200 md:text-xs lg:text-sm outline-none flex-1 w-[100%] text-slate-700' />
                        </div>

                        {/* Error Display for Email*/}
                        {
                            (check === "password")
                                ? <div className='w-[100%] md:text-xs lg:text-sm items-center flex' >
                                    <BiErrorCircle className='text-red-600 md:text-sm lg:text-xs mr-2 ml-1 mt-1' />
                                    <label className='md:text-xs text-red-600 mt-1 '> Incorrect Password</label>
                                </div>
                                : <div></div>
                        }

                    </div>

                    {/* Forgot password and Sign In button  */}
                    <div className='w-[100%]  '>
                        <div className='flex justify-end'>
                            <a href="#" className=' md:text-[0.7rem] lg:text-xs text-slate-700 md:mb-[15%] lg:mb-[10%] hover:font-semibold'>Forgot Password?</a>
                        </div>
                        <div className='flex justify-center'>
                            {/* <ul>
                                <li className='border-2  border-slate-700 text-slate-700 rounded-full md:px-8 lg:px-12 md:py-2 lg:py-2  font-semibold hover:bg-slate-700 hover:text-white '><Link href='http://localhost:3001/detection'>Sign In</Link></li>
                            </ul> */}
                            <div onClick={handleSubmit} className='border-2 select-none border-slate-700 text-slate-700 rounded-full md:px-8 lg:px-12 md:py-2 lg:py-2  font-semibold hover:bg-slate-700 hover:text-white  cursor-pointer'>
                                Sign In
                            </div>
                        </div>
                    </div>
                </div>

                {/* conatiner 2 for image  */}
                <div className='w-[75%] rounded-tr-2xl rounded-br-2xl relative'>
                    <img src="/images/Login.jpg" alt="Image" className='h-full w-full rounded-tr-2xl rounded-br-2xl' />
                    {/* <NextImage
                        src='/login1.jpg'
                        alt='/'
                        layout='fill'
                        objectFit='contain'
                    /> */}
                </div>

                {/*end */}
            </div>

        </div>



    )
}