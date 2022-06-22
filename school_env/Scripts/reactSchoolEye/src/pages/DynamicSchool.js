import React from 'react';
import Navbar from '../components/NavBar';
// import Input from '../components/Input';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NavLinks from '../components/navLinks';

import { useParams } from 'react-router-dom';
import BarChart from '../components/BarChart';
import PieChart from '../components/Pie';
import topics from '../assets/layup';
import { useGlobalContext } from '../context/appContext';
const DynamicSchool = () => {
  const { institution } = useParams();
  const { getLocalStorage } = useGlobalContext();
  const allSchools = getLocalStorage('schools');
  let targetSchool = allSchools.find((school) => school.name === institution);
  if (!targetSchool) {
    targetSchool = allSchools.find(
      (school) => school.name.split('_').join(' ') === institution
    );
  }
  // console.log(allSchools);
  const { subjects } = targetSchool;
  const [math, physics, chemistry] = subjects;
  const mathTopics = math.topics;
  const physicsTopics = physics.topics;
  const chemistryTopics = chemistry.topics;
  const topicsCount = [
    mathTopics[0].length,
    physicsTopics[0].length,
    chemistryTopics[0].length,
  ];
  const maxNumberOfTopics = Math.max(...topicsCount);
  // coverage per topic
  const mathCoverage = [...mathTopics[0].map((topic) => topic.topicCoverage)];
  const physicsCoverage = [
    ...physicsTopics[0].map((topic) => topic.topicCoverage),
  ];
  const chemistryCoverage = [
    ...chemistryTopics[0].map((topic) => topic.topicCoverage),
  ];
  const findAverage = (arr) => {
    const avg = arr.reduce((sum, curr) => sum + Number(curr), 0) / arr.length;
    return avg;
  };
  const findAmount = (arr, target) => {
    const targetArr = [...arr.filter((coverage) => coverage <= target)];
    return targetArr.length;
  };
  //amount of topics cleared
  const mathRed = findAmount(mathCoverage, 0);
  const mathBlue = findAmount(mathCoverage, 25);
  const mathOrange = findAmount(mathCoverage, 75);
  const mathGreen = findAmount(mathCoverage, 100);
  const mathDataSetData = [mathRed, mathBlue, mathOrange, mathGreen];
  const mathTouchedTopics = mathCoverage.filter((topic) => topic > 0);
  // physics
  const physicsRed = findAmount(physicsCoverage, 0);
  const physicsBlue = findAmount(physicsCoverage, 25);
  const physicsOrange = findAmount(physicsCoverage, 75);
  const physicsGreen = findAmount(physicsCoverage, 100);
  const physicsDataSetData = [
    physicsRed,
    physicsBlue,
    physicsOrange,
    physicsGreen,
  ];
  const physicsTouchedTopics = physicsCoverage.filter((topic) => topic > 0);
  // chemistry
  const chemistryRed = findAmount(chemistryCoverage, 0);
  const chemistryBlue = findAmount(chemistryCoverage, 25);
  const chemistryOrange = findAmount(chemistryCoverage, 75);
  const chemistryGreen = findAmount(chemistryCoverage, 100);
  const chemistryDataSetData = [
    chemistryRed,
    chemistryBlue,
    chemistryOrange,
    chemistryGreen,
  ];
  const chemistryTouchedTopics = chemistryCoverage.filter((topic) => topic > 0);
  // average coverage per subject
  const mathAverageCoverage = findAverage(mathCoverage);
  const physicsAverageCoverage = findAverage(physicsCoverage);
  const chemistryAverageCoverage = findAverage(chemistryCoverage);
  const displayAverageColor = (number) => {
    if (number <= 25) {
      return '#8b0000';
    } else if (number <= 50) {
      return '#00008b';
    } else if (number <= 75) {
      return '#ff8c00';
    } else {
      return '#00ff00';
    }
  };
  const displayAmountOfAverageCoverage = (number, subject) => {
    if (number <= 25 && subject === 'math') {
      return mathRed;
    } else if (number <= 50 && subject === 'math') {
      return mathBlue;
    } else if (number <= 75 && subject === 'math') {
      return mathOrange;
    } else if (number <= 100 && subject === 'math') {
      return mathGreen;
    } else if (number <= 25 && subject === 'physics') {
      return physicsRed;
    } else if (number <= 50 && subject === 'physics') {
      return physicsBlue;
    } else if (number <= 75 && subject === 'physics') {
      return physicsOrange;
    } else if (number <= 100 && subject === 'physics') {
      return physicsGreen;
    } else if (number <= 25 && subject === 'chemistry') {
      return chemistryRed;
    } else if (number <= 50 && subject === 'chemistry') {
      return chemistryBlue;
    } else if (number <= 75 && subject === 'chemistry') {
      return chemistryOrange;
    } else if (number <= 100 && subject === 'chemistry') {
      return chemistryGreen;
    }
  };
  return (
    <>
      <Wrapper>
        <Navbar pageTitle={institution} />
        {/* <div className='dynamic-school-name'>
          <h2>{institution}</h2>
        </div> */}
        <section>
          <article className='chart-container'>
            <div className='single-chart'>
              <PieChart
                pieTitle='Math Coverage'
                chartData={{
                  labels: ['0%', '25%', '75%', '100%'],

                  datasets: [
                    {
                      label: 'math',
                      data: [...mathDataSetData],
                      backgroundColor: [
                        '#8b0000',
                        '#00008b',
                        '#ff8c00',
                        '#00ff00',
                      ],
                      borderWidth: 0,
                    },
                  ],
                }}
              />
            </div>
            <div className='single-chart'>
              <PieChart
                pieTitle='Chemistry Coverage'
                chartData={{
                  labels: ['0%', '25%', '75%', '100%'],

                  datasets: [
                    {
                      label: 'chemistry',
                      data: [...chemistryDataSetData],

                      backgroundColor: [
                        '#8b0000',
                        '#00008b',
                        '#ff8c00',
                        '#00ff00',
                      ],
                      borderWidth: 0,
                    },
                  ],
                }}
              />
            </div>
            <div className='single-chart'>
              <PieChart
                pieTitle='Physics Coverage'
                chartData={{
                  labels: ['0%', '25%', '75%', '100%'],

                  datasets: [
                    {
                      label: 'physics',
                      data: [...physicsDataSetData],

                      backgroundColor: [
                        '#8b0000',
                        '#00008b',
                        '#ff8c00',
                        '#00ff00',
                      ],
                      borderWidth: 0,
                    },
                  ],
                }}
              />
            </div>
          </article>
          <BarChart
            myLabels={{ y: 'Number of topics', x: 'Subjects' }}
            YMaxValue={maxNumberOfTopics}
            pieTitle='Average Coverage per Subject'
            chartData={{
              labels: ['Mathematics', 'Physics', 'Chemistry'],

              datasets: [
                {
                  label: 'Number of Topics',
                  data: [
                    mathTouchedTopics.length,
                    physicsTouchedTopics.length,
                    chemistryTouchedTopics.length,
                  ],

                  backgroundColor: [
                    displayAverageColor(mathAverageCoverage),
                    displayAverageColor(physicsAverageCoverage),
                    displayAverageColor(chemistryAverageCoverage),
                  ],
                  borderWidth: 0,
                },
              ],
            }}
          />
          <div className='legend-container'>
            <ul className='legend'>
              <li className='red'>
                <span>Red</span> 0% - 25
              </li>

              <li className='blue'>
                <span>Blu:</span> 25% - 50%
              </li>

              <li className='orange'>
                <span>Ora:</span> 50% - 75%
              </li>

              <li className='green'>
                <span>Gre:</span> 75% - 100%
              </li>
            </ul>
          </div>
        </section>
        <div>
          <Link to={'/super'} className={`scroll-btn view2`}>
            back home
          </Link>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .alert {
    max-width: var(--max-width);
    margin-bottom: 1rem;
  }
`;

export default DynamicSchool;
