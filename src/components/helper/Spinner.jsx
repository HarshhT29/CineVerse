import React from 'react'

const Spinner = ({initial}) => {
  return (
    <div>
      <div className={`loadingSpinner w-full h-[150px] relative flex items-center justify-center ${initial ? "h-[700px]" : ""}`}>
        <svg className='spinner animate-rotation-animation z-[2] w-[50px] h-[50px]' viewBox='0 0 50 50'>
          <circle 
            className='path stroke-[#93bfec] animate-dash-animation'
            style={{ strokeLinecap: "round" }}
            cx='25' 
            cy='25' 
            r='20' 
            fill='none'
            strokeWidth="5"
          />
        </svg>
      </div>
    </div>
  )
}
export default Spinner;