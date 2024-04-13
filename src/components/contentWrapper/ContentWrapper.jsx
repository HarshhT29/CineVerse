import React from 'react'

const ContentWrapper = ({children ,className}) => {
    const contentWrapper = {
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
    }
  return (
    <div className={className} style={contentWrapper}>
      { children }
    </div>
  );
};

export default ContentWrapper