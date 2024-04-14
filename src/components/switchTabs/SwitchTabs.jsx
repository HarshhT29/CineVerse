import React from 'react'
import { useState } from 'react'

import "./style.css"

const SwitchTabs = ({data,onTabChange}) => {
  const [selectedTab,setSelectedTab] = useState(0);
  const [left,setLeft] = useState(0);

  const activeTab = (tab,index) => {
    setLeft(index*100);
    setTimeout(()=>{
      setSelectedTab(index);
    },300);
    onTabChange(tab,index);
  }

  return (
    <div className="switchingTabs h-[34px] bg-white rounded-[20px] p-[2px]">
        <div className="tabItems flex items-center h-[30px] relative">
          {data.map((tab,index)=>(
            <span key={index} className={`tabItem ${selectedTab===index?"active":""}`} onClick={()=>activeTab(tab,index)}>
              {tab}
            </span>
          ))}
          <span className={`movingBg ${left===0?"left-0":"left-[100px]"}`} />
        </div>
    </div>
  )
}

export default SwitchTabs
