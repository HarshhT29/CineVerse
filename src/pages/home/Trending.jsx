import React from 'react';
import { useState } from 'react';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../components/switchTabs/SwitchTabs';
import useHarsh from  '../../hooks/useHarsh';
import Carousel from '../../components/carousel/Carousel';
import "./style.css";

const Trending = () => {
  const [ep,setEp] = useState("day");
  const {data, loading} = useHarsh(`/trending/all/${ep}`);
  const onTabChange = (tab) => {
    setEp(tab.toLowerCase());
  }
  return (
    <div className="trendingHead relative mb-16">
        <ContentWrapper className={"flex items-center justify-between mb-5"}>
            <span className='text-2xl text-white font-normal'>Trending</span>
            <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending;
