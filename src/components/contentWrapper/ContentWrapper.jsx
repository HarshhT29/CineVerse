import React from 'react'

const ContentWrapper = ({children}) => {
    const contentWrapper = {
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
    }
  return (
    <div style={contentWrapper}>
      { children }
    </div>
  );
};

export default ContentWrapper