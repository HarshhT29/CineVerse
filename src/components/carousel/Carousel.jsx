import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import dayjs from 'dayjs';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import LazyImg from '../lazyLoadImage/LazyImg';
import PosterFallback from "../../assets/no-poster.png";
import RatingCircle from '../ratingCircle/RatingCircle';
import Genres from '../genres/Genres';
import "./style.css";

const Carousel = ({data,loading,endpoint,title}) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (direction) => {
        const container = carouselContainer.current;
        const scrollAmt = direction==="left"?container.scrollLeft-(container.offsetWidth)+20:container.scrollLeft+(container.offsetWidth)+20;
        container.scrollTo({
            left: scrollAmt,
            behavior: "smooth"
        });
    }
    const skItem = () => {
        return (
            <div className="skeletonItem w-[125px] flex-shrink-0 md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)]">
                <div className="posterBlock rounded-xl w-full aspect-[1/1.5] mb-[30px] skeleton">
                    <div className="textBlock text-white flex flex-col skeleton">
                        <div className="title w-full h-5 mb-[10px] skeleton" />
                        <div className="date w-[75%] h-5 skeleton" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="carousel mb-[50px]">
            <ContentWrapper className={"relative"}>

                {title && (
                    <div className="carTitle text-2xl text-white mb-5 font-normal">
                        {title}
                    </div>
                )}

                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow left-[30px]" onClick={() => navigation("left")} />
                <BsFillArrowRightCircleFill className="carouselRightNav arrow right-[30px]" onClick={() => navigation("right")} />

                {!loading ? (
                    <div className="carouselItems flex gap-[10px] overflow-y-hidden -mr-5 -ml-5 py-0 px-5 md:gap-5 md:overflow-hidden md:m-0 md:p-0" ref={carouselContainer}>
                        {data?.map((item)=>{
                            const posterUrl = item.poster_path?url.poster+item.poster_path:PosterFallback;

                            return (
                                <div key = {item.id} className="carouselItem w-[125px] cursor-pointer flex-shrink-0 md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)]" onClick={()=>navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                                    <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px]">
                                        <LazyImg src={posterUrl}/>
                                        <RatingCircle rating={item.vote_average.toFixed(1)} className={"w-[40px] h-[40px] relative top-[30px] bg-[color:white] flex-shrink-0 md:w-[50px] md:h-[50px]"}/>
                                        <Genres data={item.genre_ids.slice(0,2)} className={"hidden relative md:flex md:flex-wrap justify-end"}/>
                                    </div>
                                    <div className="textBlock text-white flex flex-col">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date text-[14px] opacity-50">
                                            {dayjs(item.release_date || item.first_air_date).format("MMM D,YYYY")}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton flex gap-[10px] overflow-y-hidden -mr-5 -ml-5 py-0 px-5 md:gap-5 md:overflow-hidden md:m-0 md:p-0">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Carousel;


{/* <div className="skeletonItem">
                
            </div> */}