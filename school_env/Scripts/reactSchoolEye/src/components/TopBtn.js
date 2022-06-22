import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
const TopBtn = () => {
  const [scrollHeight, setScrollHeight] = useState(window.pageYOffset);
  // const scrollHeight = window.pageYOffset;
  window.addEventListener('scroll', () => {
    setScrollHeight(window.pageYOffset);
  });
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  // scroll-btn view
  return (
    <div>
      <button
        className={`scroll-btn ${scrollHeight >= 1000 && 'view'}`}
        onClick={scrollToTop}
      >
        <FaArrowUp className='scroll-icon' />
      </button>
    </div>
  );
};

export default TopBtn;
