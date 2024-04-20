import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import LazyImg from "../lazyLoadImage/LazyImg";
import RatingCircle from "../ratingCircle/RatingCircle";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

import "./style.css";

const MovieCard = ({data,Search,mediaType,movieCardCss,posterBlockCss,textBlockCss}) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;

  return (
    <div className={`movieCard w-[calc(50%-5px)] mb-[25px] cursor-pointer flex-shrink-0 md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] ${movieCardCss}`} onClick={()=>navigate(`/${data.media_type || mediaType}/${data.id}`)}>
      <div className={`${posterBlockCss} imgBlock relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px] transition-all ease-linear duration-[0.5s] hover:opacity-50`}>
        <LazyImg src={posterUrl} className={"w-full h-full object-cover object-center"} />
        {!Search && (
          <>
            <RatingCircle rating={data.vote_average.toFixed(1)} className={"w-[40px] h-[40px] relative top-[30px] bg-white flex-shrink-0 md:w-[50px] md:h-[50px]"}/>
            <Genres data={data.genre_ids.slice(0,2)} className={"hidden relative md:flex md:flex-wrap md:justify-end"} />
          </>
        )}
      </div>
      <div className={`${textBlockCss} text-white flex flex-col`}>
        <span className="title text-[16px] mb-[10px] leading-6 md:text-xl">{data.title || data.name}</span>
        <span className="date text-[14px] opacity-50">
          {dayjs(data.release_date || data.first_air_date || "").format("MMM D, YYYY")}
        </span>
      </div>
    </div> 
  )
}

export default MovieCard
