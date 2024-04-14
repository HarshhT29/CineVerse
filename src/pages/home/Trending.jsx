import React from 'react';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../components/switchTabs/SwitchTabs';
import "./style.css";
const Trending = () => {
    const onTabChange = () => {}
  return (
    <div className="trendingHead relative mb-16">
        <ContentWrapper className={"flex items-center justify-between mb-5"}>
            <span className='text-2xl text-white font-normal'>Trending</span>
            <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
    </div>
  )
}

export default Trending
