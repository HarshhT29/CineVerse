import React from 'react';
import Banner from './Banner';
import Cast from './Cast';
import VideoSection  from './VideoSection';
import { useParams } from 'react-router-dom';
import useHarsh from '../../hooks/useHarsh';
import Carousel from "../../components/carousel/Carousel";
import "./style.css";

const Details = () => {
  const {mediaType,id} = useParams();
  const {data,loading} = useHarsh(`/${mediaType}/${id}/videos`);
  const {data: credits, loading: creditsLoading} = useHarsh(`/${mediaType}/${id}/credits`);
  const {data:similarData,loading:similarLoading} = useHarsh(`/${mediaType}/${id}/similar`);
  const {data:recomData,loading:recomLoading} = useHarsh(`/${mediaType}/${id}/recommendations`);

  const similarTitle = mediaType==="tv"?"Similar TV Shows":"Similar Movies";

  return (
    <div>
      <Banner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoSection data={data} loading={loading} />
      <Carousel data={similarData?.results} loading={similarLoading} title={similarTitle} endpoint={mediaType}/>
      <Carousel data={recomData?.results} loading={recomLoading} endpoint={mediaType} title={"Recommendations"} />
    </div>
  )
}

export default Details
