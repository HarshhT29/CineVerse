import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import dayjs from 'dayjs';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import LazyImg from '../lazyLoadImage/LazyImg';
import PosterFallback from "../../assets/no-poster.png";
import "./style.css";

const Carousel = ({data,loading}) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (direction) => { }

    return (
        <div className="carousel">
            <ContentWrapper>
                <BsFillArrowLeftCircleFill className="carouselLeftNav left-7 arrow" onClick={() => navigation("left")} />
                <BsFillArrowRightCircleFill className="carouselRightNav right-7 arrow" onClick={() => navigation("right")} />

                {!loading ? (
                    <div className="carouselItems flex gap-[10px] overflow-y-hidden mr-[-20px] ml-[-20px] py-0 px-5 md:gap-5 md:overflow-hidden m-0 p-0">
                        {data?.map((item)=>{
                            const posterUrl = item.poster_path?url.poster+item.poster_path:PosterFallback;

                            return (
                                <div className="carouselItem w-[125px] cursor-pointer flex-shrink-0 md:w-[calc(25%-15px)]">
                                    <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px]">
                                        <LazyImg src={posterUrl}/>
                                    </div>
                                    <div className="textBlock text-white flex flex-col items-center">
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
                ) : (<span>Loading...</span>)}
            </ContentWrapper>
        </div>
    )
}

export default Carousel;
