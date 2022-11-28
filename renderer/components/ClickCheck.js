import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
function ClickCheck() {


      const [globalMousePos, setGlobalMousePos] = useState({});
      const [localMousePos, setLocalMousePos] = useState({});
    
      const handleMouseMove = (event) => {
        // 👇 Get mouse position relative to element
        const localX = event.clientX - event.target.offsetLeft;
        const localY = event.clientY - event.target.offsetTop;
    
        setLocalMousePos({ x: localX, y: localY });
      };
    
      useEffect(() => {
        const handleMouseMove = (event) => {
          setGlobalMousePos({
            x: event.clientX,
            y: event.clientY,
          });
        };
    
        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
          window.removeEventListener(
            'mousemove',
            handleMouseMove
          );
        };
      }, []);
    
      return (
        <div>
          <div
            style={{
              border: '1px solid gray',
              display: 'inline-block',
              padding: '75px',
              textAlign: 'center',
            }}
            onMouseMove={handleMouseMove}
          >
            Local
            <br />
            <b>
              ({localMousePos.x}, {localMousePos.y})
            </b>
          </div>
          <br />
          Global
          <br />
          <b>
            ({globalMousePos.x}, {globalMousePos.y})
          </b>
        </div>
      );
    
    

//   return (
   
   
//    <div className='bg-red-300 h-screen'>
//         <div className="w-full h-1/4 border-4 text-center align-middle items-center">1</div>
        
//         <div className="w-full h-1/4 border-4 text-center items-center">2</div>

//         <div className="w-full h-1/4 border-4 text-center items-center">3</div>

//         <div className="w-full h-1/4 border-4 text-center items-center">4</div>

//     </div>
//   )
}

export default ClickCheck