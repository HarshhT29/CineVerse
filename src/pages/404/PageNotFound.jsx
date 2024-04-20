import React from 'react';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import "./style.css";

const PageNotFound = () => {
  return (
    <div className="pgNotFound h-[700px] pt-52">
      <ContentWrapper className={"text-center text-red-700 flex flex-col"}>
        <span className="numTxt text-9xl font-bold">404</span>
        <span className="mssgTxt text-5xl">Page Not Found!</span>
      </ContentWrapper>
    </div>
  )
}

export default PageNotFound;
