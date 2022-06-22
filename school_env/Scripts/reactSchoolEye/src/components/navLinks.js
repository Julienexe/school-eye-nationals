import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/appContext';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
const NavLinks = () => {
  const { subjects } = useGlobalContext();
  const targetElement = useRef();
  const [toggleLinks, setToggleLinks] = useState(false);
  const getDestination = (subject) => {
    if (subject === 'math') {
      return '/dashboard/math';
    }
    if (subject === 'physics') {
      return '/dashboard/physics';
    }
    if (subject === 'chemistry') {
      return '/dashboard/chemistry';
    }
  };
  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  }
  const positionSubjectNames = () => {
    if (targetElement.current) {
      const targetPositions = targetElement.current.getBoundingClientRect();

      // return {
      //   top: getOffset(targetElement.current).top,
      //   left: getOffset(targetElement.current).left,
      // };
      return {
        top: targetPositions.top,
        left: targetPositions.left,
        width: targetPositions.y,
      };
    }
    return {
      top: 0,
      right: 0,
      width: 0,
    };
  };
  // console.log(positionSubjectNames());
  const Wrapper = styled.article`
    .nav-links {
      display: none;
      transition: all 0.5s;
    }
    a {
      transition: all 0.5s;
    }
    a:hover {
      transform: scale(1.5, 1.5);
    }
    a:active {
      color: #645cff;
    }
    .subjectName-container {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      position: fixed;
      top: ${positionSubjectNames().top};
      left: ${positionSubjectNames().left - 330}px;
      z-index: 2;
      background: rgb(248, 250, 252);
      padding: 5px;
      padding-top: 0;
      border-radius: 15px;
    }
    .show-links {
      display: inline-block;
      transition: all 0.5s;
    }
    section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 20rem;
    }
    section div {
      margin-left: 1rem;
      margin-right: 1rem;
      font-size: medium;
      text-transform: capitalize;
    }
  `;

  return (
    <Wrapper>
      <section>
        <div>
          <Link to='/dashboard'>Dashboard</Link>
        </div>
        <div>
          <Link to='/dashboard/tests'>Tests</Link>
        </div>
        <div>
          <Link to='/dashboard/scholarships'>Scholarships</Link>
        </div>
        <div
          onMouseEnter={() => setToggleLinks(true)}
          onMouseLeave={() => setToggleLinks(false)}
          ref={targetElement}
          className='hallo world'
        >
          <Link to='#'>Subjects</Link>
        </div>
      </section>
      <section className='subjectName-container'>
        {subjects.map((subject, index) => {
          return (
            <div
              key={index}
              className={`nav-links ${toggleLinks && 'show-links'}`}
              onMouseEnter={() => setToggleLinks(true)}
              onMouseLeave={() => setToggleLinks(false)}
            >
              <Link to={getDestination(subject.subject)}>
                {subject.subject}
              </Link>
            </div>
          );
        })}
      </section>
    </Wrapper>
  );
};
// const Wrapper = styled.article`
//   .nav-links {
//     display: none;
//   }
//   .subjectName-container {
//     flex-direction: column;
//     justify-content: flex-start;
//     align-items: flex-start;
//     position: fixed;
//     z-index: 2;
//   }
//   .show-links {
//     display: inline-block;
//   }
//   section {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-left: 20rem;
//   }
//   section div {
//     margin-left: 1rem;
//     margin-right: 1rem;
//     font-size: smaller;
//     text-transform: capitalize;
//   }
// `;
export default NavLinks;
