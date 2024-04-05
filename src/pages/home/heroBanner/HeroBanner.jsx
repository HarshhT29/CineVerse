import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./style.css"
import useHarsh from '../../../hooks/useHarsh';

const HeroBanner = () => {
  const [bg,setBg] = useState("");
  const [inp,setInp] = useState("");
  const navigate = useNavigate();

  const {data,loading,err} = useHarsh("/movie/upcoming");

  useEffect(()=>{
    const bgImage = data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setBg(bgImage);
  }, [data])

  const inpHandler = (e) => {
    if(e.key==="Enter" && inp.length>0)
      navigate(`/search/${inp}`);
    setInp(e.target.value);
  };
  return (
    <div className="hero-banner">
      <div className="banner-wrapper">
        <div className="banner-content">
          <span className="title">Welcome</span>
          <span className="subtitle">Millions of movies, TV shows and people to discover. Explore now!</span>
          <div className="searchInput">
            <input type="text" placeholder="Search" 
              onChange={inpHandler} value={inp}
              onKeyUp={inpHandler}/>
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner
