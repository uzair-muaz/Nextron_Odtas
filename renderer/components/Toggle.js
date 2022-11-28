import React from 'react'
import classNames from 'classnames'

function Toggle(props) {
  const isEnabled = props.toggleState
   
  return (

    <div  className={classNames('flex h-[100%] cursor-pointer w-[100%]  bg-gray-200 rounded-full transition-all duration-500 border-9 border-gray-400', { 'bg-sky-300':isEnabled  } )}>
        <span className={classNames('items-start h-[100%] w-[50%] bg-white border-gray-400 rounded-full shadow-lg  transition-all border-2 duration-500 p-[5%]', { 'bg-gray-300':isEnabled, 'ml-[50%]':isEnabled} )}/>

    </div>
  )
}

export default Toggle