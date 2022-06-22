import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Navbar from '../components/NavBar';
import NavLinks from '../components/navLinks';
import { Link, Navigate } from 'react-router-dom';
import StudentFormInput from '../components/StudentFormInput';
import { useGlobalContext } from '../context/appContext';
import TestsSlide from '../components/TestsSlide';
import { useNavigate } from 'react-router-dom';
const Tests = () => {
  const [testData, setTestData] = useState('');
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Navbar pageTitle='School eye'>
        <NavLinks />
      </Navbar>
      <div className='center-div'>
        <h4>{`test questions (${active + 1} of ${testData.length})`}</h4>
      </div>
      <TestsSlide data={{ testData, setTestData, active, setActive }} />

      <div className='center-div'>
        <h5>please enter student credentials before submit</h5>
      </div>
      <StudentFormInput />
      {/* <button
        type='submit'
        className='btn'
        disabled={isLoading}
        onClick={() => navigate('/dashboard')}
      >
        {isLoading ? 'submitting' : 'submit'}
      </button> */}
      <div>
        <Link to={'/dashboard'} className={`scroll-btn view2`}>
          back home
        </Link>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .btn {
    height: 100%;
    padding: 0.75rem;
    margin: 0.7rem;
  }
`;
export default Tests;
