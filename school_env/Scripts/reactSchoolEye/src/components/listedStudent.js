import React from 'react';
import { useState } from 'react';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { faker } from '@faker-js/faker';
import styled from 'styled-components';
import backgroundImg from '../assets/chemistry-rep.jpg';
const ListedStudent = ({
  first_name,
  given_name,
  ID_Number,
  combination,
  score,
  DOB,
  user_id,
  length,
}) => {
  const [displayStudent, setDisplayStudent] = useState(false);
  const [displaySponsors, setDisplaySponsors] = useState(false);
  // avatar: faker.image.avatar(),
  const sponsors = [
    {
      scholarship: 'Canada Government Student Grants Loans & Scholarships',
      email: faker.internet.email('canadagovernment', 'Scholarships'),
    },
    {
      scholarship:
        'Canada-ASEAN Scholarships and Educational Exchanges for Development (SEED)',

      email: faker.internet.email('Canadaexchanges', 'ASEANscholarships'),
    },
    {
      scholarship: `Indian Government Scholarships`,
      email: faker.internet.email('indian', 'scholarships'),
    },
    {
      scholarship: 'Global International Support Scholarships',
      email: faker.internet.email('globalsupport', 'scholarships'),
    },
    {
      scholarship: `China MOFCOM Scholarship Programme`,
      email: faker.internet.email('China', 'scholarshipprogramme'),
    },
    {
      scholarship: 'World Bank Scholarships Program',
      email: faker.internet.email('worldbank', 'scholarships'),
    },
  ];
  const scholarships = (sliceNumber) => {
    const randomSponserIndex = Math.floor(Math.random() * sponsors.length);
    const randomSponserIndex1 = Math.floor(Math.random() * sponsors.length);
    const randomSponserIndex2 = Math.floor(Math.random() * sponsors.length);
    const randomSponserIndex3 = Math.floor(Math.random() * sponsors.length);
    const randomSponserIndex4 = Math.floor(Math.random() * sponsors.length);
    let cutSponser = [
      sponsors[randomSponserIndex],
      sponsors[randomSponserIndex1],
      sponsors[randomSponserIndex2],
      sponsors[randomSponserIndex3],
      sponsors[randomSponserIndex4],
    ];
    return cutSponser.slice(0, sliceNumber);
  };
  return (
    <Wrapper>
      <div className='popup'>
        <BsFillPersonLinesFill className='icon' />
        <h5>{`${first_name} ${given_name}`}</h5>
        <button onClick={() => setDisplayStudent(!displayStudent)}>
          {displayStudent ? <AiFillMinusCircle /> : <AiFillPlusCircle />}
        </button>
      </div>
      <div className={`${!displayStudent && 'hide'} `}>
        {/* <div className={!displayStudent && 'hide'}> */}
        <section className='student-identity'>
          <div>
            <h6>student name: </h6>
            <p>{` ${first_name} ${given_name}`}</p>
          </div>
          <div>
            <h6>combination: </h6>
            <p>{` ${combination}`}</p>
          </div>
        </section>
        <section className='student-credentials'>
          <div>
            <h6>student number: </h6>
            <p>{ID_Number}</p>
          </div>
          <div>
            <h6>DOB: </h6>
            <p>{DOB}</p>
          </div>
          <div>
            <h6>scores: </h6>
            <p>{score}%</p>
          </div>
        </section>

        <section
          className='sponsor-container'
          onMouseEnter={() => setDisplaySponsors(true)}
          onMouseLeave={() => setDisplaySponsors(false)}
        >
          <h5
          // onMouseEnter={() => setDisplaySponsors(true)}
          // onMouseLeave={() => setDisplaySponsors(false)}
          >
            interested sponsors
          </h5>
          {scholarships(length).map((sponsor, index) => {
            return (
              <article
                key={index}
                className={`sponsor ${!displaySponsors && 'hide'}`}
                // onMouseEnter={() => setDisplaySponsors(true)}
                // onMouseLeave={() => setDisplaySponsors(false)}
              >
                <div>
                  <BsFillPersonLinesFill className='icon' />
                </div>
                <div>
                  <p>{sponsor.scholarship}</p>
                  <p>Email: {sponsor.email}</p>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  margin: 1rem;
  h5 {
    margin-bottom: 0;
    text-align: center;
  }
  div {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    flex-direction: column;
    margin-left: 0.5rem;
    padding-left: 1em;
  }
  .student-identity p,
  .student-credentials p {
    margin-bottom: 0;
    display: inline-block;
    padding: 0;
  }
  .popup {
    align-items: center;
    align-self: flex-start;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(${backgroundImg});
    color: rgb(255, 255, 255);
    padding: 1rem;
    border-radius: 5px;
    /* background-attachment: fixed; */
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .popup > h5 {
    text-align: center;
  }
  .popup > button {
    background: transparent;
    color: rgb(255, 255, 255);
    border: none;
    font-size: large;
  }
  .hide {
    display: none;
  }
  /* .student-identity > div {
    text-transform: capitalize;
    display: flex;
  } */
  .student-credentials > div,
  .student-identity > div {
    min-width: 350px;
    text-transform: capitalize;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .sponsor-container:hover {
    cursor: pointer;
  }
  .sponsor-container p {
    margin-bottom: 0;
  }
  .sponsor {
    text-transform: capitalize;
    font-size: small;
    margin-top: 0.5em;
    padding-top: 5px;
    background: rgba(238, 243, 247, 0.4);
    border-radius: 5px;
  }
  .icon {
    font-size: 1.5em;
  }
`;
export default ListedStudent;
