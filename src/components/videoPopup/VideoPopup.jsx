import React from "react";
import ReactPlayer from "react-player/youtube";
import "./style.css";

const VideoPopup = ({show,setShow,videoId,setVideoId}) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return (
        <div className={`videoPopup flex justify-center items-center w-full h-full fixed top-0 left-0 opacity-0 z-[9] ${show?"visible opacity-100":"invisible"}`}>
            <div className={`opacityLayer absolute top-0 left-0 w-full h-full bg-[#00000040] backdrop-blur-[3.5px] opacity-0 transition-opacity duration-[400ms] ${show?"opacity-100":""}`} onClick={hidePopup}></div>
            <div className={`videoPlayer relative w-[800px] aspect-[16/9] bg-white scale-[0.2] transition-transform duration-[250ms] ${show?"scale-[1]":""}`}>
                <span className="closeBtn absolute -top-5 right-0 text-white cursor-pointer" onClick={hidePopup}>Close</span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
};

export default VideoPopup;
