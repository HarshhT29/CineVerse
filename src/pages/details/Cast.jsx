import React from "react";
import { useSelector } from "react-redux";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import LazyImg from "../../components/lazyLoadImage/LazyImg";
import Avatar from "../../assets/avatar.png";

// import "./style.css";

const Cast = ({data,loading}) => {
    const {url} = useSelector((state)=>state.home);
    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle w-[125px] h-[125px] rounded-[50%] mb-[15px] md:w-[175px] md:h-[175px] md:mb-[25px] skeleton"></div>
                <div className="row w-full h-5 rounded-[10px] mb-[10px] skeleton"></div>
                <div className="row1 w-[75%] h-5 rounded-[10px] my-0 mx-auto skeleton"></div>
            </div>
        );
    }

    return (
        <div className="castSection relative mb-[50px]">
            <ContentWrapper>
                <div className="sectionHeading text-2xl text-white mb-[25px]">
                    Top Cast
                    {!loading?(
                        <div className="listItems flex gap-5 overflow-y-hidden -mr-5 -ml-5 py-0 px-5 md:m-0 md:p-0">
                            {data?.map((i)=>{
                                let imgUrl = i.profile_path?url.profile + i.profile_path:Avatar;
                                return(
                                    <div key={i.id} className="listItem text-center text-white">
                                        <div className="profileImg w-[125px] h-[125px] rounded-[50%] overflow-hidden mb-[15px] md:w-[175px] md:h-[175px] md:mb-[25px]">
                                            <LazyImg src={imgUrl} className={"w-full h-full object-cover object-center-top block"}/>
                                        </div>
                                        <div className="name text-[14px] leading-5 font-semibold md:text-[18px] md:leading-6">{i.name}</div>
                                        <div className="character text-[14px] leading-5 opacity-50 md:text-[16px] md:leading-6">{i.character}</div>
                                    </div>
                                );
                            })}
                        </div>
                    ):(
                        <div className="castSkeleton flex gap-5 overflow-y-hidden -mr-5 -ml-5 py-0 px-5 md:m-0 md:p-0">
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                        </div>
                    )}
                </div>
            </ContentWrapper>
        </div>
    );
}

export default Cast;