import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/appContext';
const TestsSlide = ({ data }) => {
  const { testData, setTestData, active, setActive } = data;
  // const {getLocalStorage} = useGlopbalContext()
  const getTriviaData = async () => {
    try {
      const { data } = await axios.get(
        'https://the-trivia-api.com/api/questions?categories=science,general_knowledge&limit=20&region=UG&difficulty=medium'
      );
      // const saved
      setTestData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const checkIndex = (number) => {
    if (number > testData.length - 1) {
      return 0;
    } else if (number < 0) {
      return testData.length - 1;
    } else {
      return number;
    }
  };
  const incrementActive = () => {
    setActive(checkIndex(active + 1));
  };
  const reduceActive = () => {
    setActive(checkIndex(active - 1));
  };
  useEffect(() => {
    getTriviaData();
  }, []);
  return (
    <>
      <Wrapper>
        {testData &&
          testData.map((questionObj, index) => {
            const { question, correctAnswer, incorrectAnswers } = questionObj;
            const options = [...incorrectAnswers, correctAnswer];
            return (
              <section
                key={index}
                className={`single-question ${index === active && 'active'} ${
                  index === active - 1 && 'previous'
                }`}
              >
                <h4>{question}</h4>
                <ol type='a'>
                  {options.map((option, index) => {
                    return (
                      <li
                        key={index}
                        onClick={incrementActive}
                        className='options-item'
                      >
                        {option}
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
      </Wrapper>
      <div className='center-div'>
        <button className='btn' onClick={reduceActive}>
          prev
        </button>
        <button className='btn' onClick={incrementActive}>
          next
        </button>
      </div>
    </>
  );
};
const Wrapper = styled.section`
  display: flex;
  position: relative;
  margin-bottom: 2rem;
  min-height: 50vh;
  overflow: hidden;
  .options-item {
    transition: all 0.3s ease-in-out;
  }
  .options-item:hover {
    transform: translateX(10px);
  }
  .single-question {
    min-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: larger;
    position: absolute;
    visibility: hidden;
    left: 100%;
    transition: all 1s ease-in-out;
  }
  .active {
    transform: translateX(-100%);
    visibility: visible;
  }
  .previous {
    transform: translateX(-200%);
    visibility: hidden;
  }
  li {
    cursor: pointer;
  }
`;
export default TestsSlide;
