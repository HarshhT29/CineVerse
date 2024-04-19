import React, { useState } from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "./PlayIcon";
import VideoPopup from "../../components/videoPopup/VideoPopup";
import LazyImg from "../../components/lazyLoadImage/LazyImg";

import "./style.css";

const VideoSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem w-[150px] flex-shrink-0 md:w-[25%]">
                <div className="thumb w-full aspect-[16/9] rounded-xl mb-[10px] skeleton"></div>
                <div className="row h-5 w-full rounded-[10px] mb-[10px] skeleton"></div>
                <div className="row1 h-5 w-[75%] rounded-[10px] skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videoSection relative mb-[50px]">
            <ContentWrapper>
                <div className="sectionHeading text-2xl text-white mb-[25px]">Official Videos</div>
                {!loading ? (
                    <div className="videos flex gap-[10px] overflow-x-auto -mr-5 -ml-5 py-0 px-5 md:gap-5 md:m-0 md:p-0">
                        {data?.results?.map((vid)=>(
                            <div key={vid.id} className="videoItem w-[150px] flex-shrink-0 cursor-pointer md:w-[25%]"
                            onClick={()=>{
                                setVideoId(vid.key);
                                setShow(true);
                            }}
                            >
                                <div className="thumbNail mb-[15px] relative">
                                    <LazyImg src={`https://img.youtube.com/vi/${vid.key}/mqdefault.jpg`} />
                                    <PlayIcon />
                                </div>
                                <div className="vidTitle text-white text-[14px] leading-5 md:text-[16px] md:leading-6">{vid.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton flex gap-[10px] overflow-x-auto -mr-5 -ml-5 py-0 px-5 md:gap-5 md:m-0 md:p-0">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};
export default VideoSection;