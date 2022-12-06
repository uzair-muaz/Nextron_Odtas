import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"

function Navbar() {

    
    const [user, setUser] = useState("/images/user.png");

    useEffect(() => {



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
            else {
                let userDetails = await response.json()
                setUser(userDetails.Avatar)
                console.log(user)
            }
        }
        authorizeUser();

    }, [])

    const router = useRouter();
    const logout = () => {
        localStorage.clear();
        router.push('/')
    }
    

    return (

        <nav className='w-full h-[100%] shadow-xl bg-gray-800 text-white '>
            <div className='justify-between flex items-center w-full h-full px-2 2xl:px-16 '  >
                <div className='flex justify-start items-center w-full h-full '>

                    <Image
                        src='/images/1.png'
                        alt='/'
                        width='150'
                        height='80'

                    />


                    <ul className='flex h-[30%]'>
                        <li className=" ml-4 md:ml-6 text-sm uppercase relative before:content-[''] before:absolute before:block before:w-full before:h-[10%] 
                                        before:-bottom-1 before:left-0 before:bg-sky-300
                                        before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                                        before:transition before:ease-in-out before:duration-300">
                            <Link href='/dashboard'>Home</Link>
                        </li>
                        <li className=" ml-4 md:ml-6 text-sm uppercase relative before:content-[''] before:absolute before:block before:w-full before:h-[10%] 
                                        before:-bottom-1 before:left-0 before:bg-sky-300
                                        before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                                        before:transition before:ease-in-out before:duration-300">
                            <Link href='/detection'>Detection</Link>
                        </li>
                        <li className=" ml-4 md:ml-6 text-sm uppercase relative before:content-[''] before:absolute before:block before:w-full before:h-[10%] 
                                        before:-bottom-1 before:left-0 before:bg-sky-300
                                        before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                                        before:transition before:ease-in-out before:duration-300">
                            <Link href='/videoGallery'>Videos</Link>
                        </li>

                    </ul>
                </div>




                <div className='h-[100%] flex items-center justify-end w-20  rounded-full p-1 '>
                
                    {/* <img src='/images/user.png' alt="" className='h-[85%] w-[80%] rounded-full' /> */}

                    <img src={user} alt="" className='h-[85%] w-[80%] rounded-full' />
                    
                    {/* <img src={user} alt="" className='h-[85%] w-[80%] rounded-full' /> */}
                    
                    
                    
                    {/* <Image
                            src='/images/user.png'
                            alt='/'
                            width='65'
                            height='65'
                            className='rounded-full  '
                    /> */}
                       
                </div>




            </div>
        </nav>

    )
}

export default Navbar;