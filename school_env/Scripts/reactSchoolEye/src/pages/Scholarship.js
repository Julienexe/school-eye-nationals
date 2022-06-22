import React from 'react';
import Navbar from '../components/NavBar';
import NavLinks from '../components/navLinks';
import ListedStudent from '../components/listedStudent';
import { useGlobalContext } from '../context/appContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Scholarship = () => {
  let { students } = useGlobalContext();
  students = students.filter((student) => parseInt(student.score) > 60);

  console.log(students);
  return (
    <>
      <Navbar pageTitle='query'>
        <NavLinks />
      </Navbar>
      <Wrapper>
        {students.length < 1 ? (
          <div className='center-div'>
            <h4>no students to display</h4>
          </div>
        ) : (
          students.map((student, index) => {
            const length = Math.random() * 10;
            return (
              <ListedStudent
                key={index}
                {...student}
                length={length}
              ></ListedStudent>
            );
          })
        )}
        <div>
          <Link to={'/dashboard'} className={`scroll-btn view2`}>
            back home
          </Link>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  width: 95vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-row-gap: 2rem;
  grid-column-gap: 30px;
`;
export default Scholarship;
