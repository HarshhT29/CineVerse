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
    const bgImage = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setBg(bgImage);
  }, [data])

  const inpHandler = (e) => {
    if(e.key==="Enter" && inp.length>0)
      navigate(`/search/${inp}`);
    setInp(e.target.value);
  };
  return (
    <div className="hero-banner w-full bg-[color:var(--black)] flex items-center relative h-[450px] md:h-[700px]">
      {!loading && <div className="backdropImg w-full h-full absolute top-0 left-0 opacity-[0.5] overflow-hidden">
        <LazyImg src={bg.toString()} alt="" className={'w-full h-full object-cover object-center'}/>
      </div>}

      <div className="opacity-layer md:w-full md:h-64 absolute bottom-0 left-0"></div>


      <ContentWrapper>
        <div className="banner-content flex flex-col items-center text-white text-center relative max-w-[800px] my-0 mx-auto">
          <span className="title text-[50px] font-bold md:mb-0 md:text-[90px]">Welcome</span>
          <span className="subtitle text-[18px] font-bold md:text-[24px]">Millions of movies, TV shows and people to discover. Explore now!</span>
          <div className="searchInput">
            <input type="text" placeholder="Search" 
              onChange={inpHandler} value={inp}
              onKeyUp={inpHandler}/>
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default HeroBanner
