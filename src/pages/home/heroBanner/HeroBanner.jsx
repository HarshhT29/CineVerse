import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import useHarsh from '../../../hooks/useHarsh';
import { useSelector } from "react-redux";
import LazyImg from "../../../components/lazyLoadImage/LazyImg";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import "./style.css"

const HeroBanner = () => {
  const [bg,setBg] = useState("");
  const [inp,setInp] = useState("");
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);
  const {data,loading} = useHarsh("/movie/upcoming");
  
  useEffect(()=>{
    const bgImage = url.backdrop?url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path:"https://image.tmdb.org/t/p/original/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg";
    setBg(bgImage);
  }, [data])

  const inpHandler = (e) => {
    if(e.key==="Enter" && inp.length>0)
      navigate(`/search/${inp}`);
    setInp(e.target.value);
  };
  return (
    <div className="hero-banner w-full h-[450px] bg-[color:var(--black)] flex items-center relative md:h-[700px]">
      {!loading && <div className="backdropImg w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden">
        <LazyImg src={bg.toString()} alt="" height={'100%'} width={'100%'} />
      </div>}

      <div className="opacity-layer w-full h-[250px] absolute bottom-0 left-0"></div>

      <ContentWrapper>
        <div className="banner-content flex flex-col items-center text-white text-center relative max-w-[800px] my-0 mx-auto">
          <span className="title text-[50px] font-bold mb-[10px] md:mb-0 md:text-[80px]">Welcome</span>
          <span className="subtitle text-[18px] font-medium mb-10 md:text-2xl">Millions of movies and TV shows to discover. Explore now!</span>
          <div className="searchInput flex items-center w-full">
            <input type="text" placeholder="Search" 
              onChange={inpHandler} value={inp}
              onKeyUp={inpHandler} className="w-[calc(100%-100px)] h-[50px] bg-white outline-0 border-0 rounded-tl-3xl rounded-bl-3xl rounded-tr-none rounded-br-none py-0 px-4 text-[14px] md:w-[calc(100%-150px)] md:h-[60px] md:text-xl md:px-7 text-black"/>
            <button className='w-[100px] h-[50px] bg-[image:var(--gradient)] outline-0 border-0 rounded-tr-3xl rounded-br-3xl rounded-tl-none rounded-bl-none text-[16px] cursor-pointer md:w-[150px] md:h-[60px] md:text-[18px]' onClick={() => navigate(`/search/${inp}`)}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default HeroBanner
