import React from 'react';
import { useState } from 'react';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../components/switchTabs/SwitchTabs';
import useHarsh from  '../../hooks/useHarsh';
import Carousel from '../../components/carousel/Carousel';
import "./style.css";

const TopRated = () => {
  const [ep,setEp] = useState("movie");
  const {data, loading} = useHarsh(`/${ep}/top_rated`);
  const onTabChange = (tab) => {
    setEp(tab==="Movies"?"movie":"tv");
  }
  return (
    <div className="popularHead relative mb-16">
        <ContentWrapper className={"flex items-center justify-between mb-5"}>
            <span className='text-2xl text-white font-normal'>Top Rated</span>
            <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={ep}/>
    </div>
  )
}

export default TopRated;
