import React from "react";
import "./ScrollBT.css"

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-to-top">
      <button onClick={scrollToTop} className="scroll-button">
        TOP
      </button>
    </div>
  );
};

export default ScrollToTopButton;
