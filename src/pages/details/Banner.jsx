import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import useHarsh from "../../hooks/useHarsh";
import Genres from "../../components/genres/Genres";
import RatingCircle from "../../components/ratingCircle/RatingCircle";
import LazyImg from "../../components/lazyLoadImage/LazyImg";
import PosterFallback from "../../assets/no-poster.png";
import { PlayIcon } from "./PlayIcon";
import VideoPopup from "../../components/videoPopup/VideoPopup";

import "./style.css";

const Banner = ({ video, crew }) => {
    const[show,setShow] = useState(false);
    const[videoId,setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useHarsh(`/${mediaType}/${id}`);

    const { url } = useSelector((state) => state.home);

    const genreUtil = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter((f) => f.job === "ScreenPlay" || f.job === "Story" || f.job === "Writer");

    const timeFormat = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const min = totalMinutes % 60;
        return `${hours} h ${min > 0 ? `${min} m` : ""}`;
    };
    return (
        <div className="detailsBanner w-full bg-[var(--black)] pt-[100px] mb-[50px] md:mb-0 md:pt-[120px] md:min-h-[700px]">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdropImg w-full h-full absolute top-0 left-0 opacity-10 overflow-hidden">
                                <LazyImg src={url.backdrop + data.backdrop_path} />
                            </div>
                            <div className="opacityLayer"></div>
                            <ContentWrapper>
                                <div className="content flex relative flex-col gap-[25px] md:gap-[50px] md:flex-row">
                                    <div className="leftContent flex-shrink-0">
                                        {data.poster_path ?
                                            (<LazyImg
                                                className="posterImg"
                                                src={url.backdrop + data.poster_path}
                                            />) : (
                                                <LazyImg
                                                    className="posterImg"
                                                    src={PosterFallback}
                                                />
                                            )}
                                    </div>
                                    <div className="rightContent text-white">
                                        <div className="title text-[28px] leading-10 md:text-[34px] md:leading-[44px]">
                                            {`${data.name || data.title} (${dayjs(data?.release_date).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle text-[16px] leading-6 italic mb-[15px] opacity-50 md:text-xl">
                                            {data.tagline}
                                        </div>
                                        <Genres data={genreUtil} className={""} />
                                        <div className="rightRow flex items-center gap-[25px] mb-[25px] ">
                                            <RatingCircle rating={data.vote_average.toFixed(1)} className={"max-w-[70px] bg-white md:max-w-[90px]"} />
                                            <div className="playBtn group flex items-center gap-5 cursor-pointer" onClick={()=>{
                                                setShow(true);
                                                setVideoId(video.key);
                                                }}>
                                                <PlayIcon />
                                                <span className="txt">Watch Trailer</span>
                                            </div>
                                        </div>
                                        <div className="overview mb-[25px]">
                                            <div className="heading text-[24px] mb-[10px]">
                                                Overview
                                            </div>
                                            <div className="description leading-6 md:pr-[100px]">
                                                {data.overview}
                                            </div>
                                        </div>
                                        <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="txt-ex">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="txt">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="txt-ex">
                                                        Release Date:{" "}
                                                    </span>
                                                    <span className="txt">
                                                        {dayjs(
                                                            data.release_date
                                                        ).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="txt-ex">
                                                        Runtime:{" "}
                                                    </span>
                                                    <span className="txt">
                                                        {timeFormat(data?.runtime)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {director?.length > 0 && (
                                            <div className="info space-x-1">
                                                <span className="txt-ex">
                                                    Director:{" "}
                                                </span>
                                                <span className="txt">
                                                    {director?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {director.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {writer?.length > 0 && (
                                            <div className="info space-x-1">
                                                <span className="txt-ex">
                                                    Writer:{" "}
                                                </span>
                                                <span className="txt">
                                                    {writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {data?.created_by?.length > 0 && (
                                            <div className="info space-x-1">
                                                <span className="txt-ex">
                                                    Creator:{" "}
                                                </span>
                                                <span className="txt">
                                                    {data?.created_by?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {data?.created_by?.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup 
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="dbSkeleton flex relative flex-col gap-[25px] md:gap-[50px] md:flex-row">
                    <ContentWrapper className={"flex gap-[50px]"}>
                        <div className="leftEle flex-shrink-0 w-full block rounded-xl aspect-[1/1.5] md:max-w-[350px] skeleton"></div>
                        <div className="rightEle w-full ">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
}

export default Banner;