import React from 'react'

import OperatorDash from '../components/OperatorDash';


function dashboard() {
    
    return (
        <div className='bg-slate-200 h-full '>

            {/* Containter for Video Elements */}
            <div className=' h-[100%] bg-red-800 '>
                <OperatorDash/>
            </div> 

        </div>
    )
}

export default dashboard

