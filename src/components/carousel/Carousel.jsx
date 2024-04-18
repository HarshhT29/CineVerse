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

const Carousel = ({data,loading}) => {
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
            <div className="skeletonItem">
                <div className="posterBlock skeleton">
                    <div className="textBlock skeleton">
                        <div className="title skeleton" />
                        <div className="date skeleton" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="carousel mb-[50px]">
            <ContentWrapper className={"relative"}>
                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow left-[30px]" onClick={() => navigation("left")} />
                <BsFillArrowRightCircleFill className="carouselRightNav arrow right-[30px]" onClick={() => navigation("right")} />

                {!loading ? (
                    <div className="carouselItems flex gap-[10px] overflow-y-hidden -mr-5 -ml-5 py-0 px-5 md:gap-5 md:overflow-hidden md:m-0 md:p-0" ref={carouselContainer}>
                        {data?.map((item)=>{
                            const posterUrl = item.poster_path?url.poster+item.poster_path:PosterFallback;

                            return (
                                <div key = {item.id} className="carouselItem w-[125px] cursor-pointer flex-shrink-0 md:w-[calc(25%-15px)]" onClick={()=>navigate(`/${item.media_type}/${item.id}`)}>
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
                                            {dayjs(item.release_Date).format("MMM D,YYYY")}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
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
                <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px] skeleton">
                    <div className="textBlock text-white flex flex-col skeleton">
                        <div className="title skeleton" />
                        <div className="date text-[14px] opacity-50 skeleton" />
                    </div>
                </div>
            </div> */}