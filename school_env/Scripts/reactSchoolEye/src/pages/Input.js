import React, { useState, useEffect } from 'react';
import inputTopics from '../assets/layup';
import axios from 'axios';
import '../axios';
import { useGlobalContext } from '../context/appContext';
import { useParams } from 'react-router-dom';
import Navbar from '../components/NavBar';
import NavLinks from '../components/navLinks';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate, Navigate } from 'react-router-dom';
// VERSION ALPHA
// const Input = ({ handleRadioChange, SubjectDOM }) => {
//   const { subjects } = useGlobalContext();
//   const { SubjectDOM1, SubjectDOM2, SubjectDOM3 } = SubjectDOM;
//   const checkSubject = (variable) => {
//     if (variable === 'math') {
//       return SubjectDOM1;
//     } else if (variable === 'physics') {
//       return SubjectDOM2;
//     } else {
//       return SubjectDOM3;
//     }
//   };
//   // const [checkColor,setCheckColor] = useState('red');
//   return (
//     <section>
//       {subjects.map((subject, index) => {
//         return (
//           <article
//             key={index}
//             className='subject'
//             ref={checkSubject(subject.subject)}
//           >
//             <h2>{subject.subject}</h2>
//             <div className='coverage-input'>
//               {subject.topics.map((topic, index) => {
//                 return topic.map((topic, index) => {
//                   return (
//                     <fieldset key={index}>
//                       <legend>{topic.title}</legend>
//                       <input
//                         type='radio'
//                         name={topic.title}
//                         id='red'
//                         value='0%'
//                         onChange={handleRadioChange}
//                         className='flex'
//                       />
//                       <label htmlFor='red'>0%</label>
//                       <input
//                         type='radio'
//                         name={topic.title}
//                         id='blue'
//                         value='25%'
//                         onChange={handleRadioChange}
//                         className='flex'
//                       />
//                       <label htmlFor='blue'>25%</label>
//                       <input
//                         type='radio'
//                         name={topic.title}
//                         id='orange'
//                         value='75%'
//                         onChange={handleRadioChange}
//                         className='flex'
//                       />
//                       <label htmlFor='orange'>75%</label>
//                       <input
//                         type='radio'
//                         name={topic.title}
//                         id='green'
//                         value='100%'
//                         onChange={handleRadioChange}
//                         className='flex'
//                       />
//                       <label htmlFor='green'>100%</label>
//                       <p>current percentage: {topic.topicCoverage}</p>
//                     </fieldset>
//                   );
//                 });
//               })}
//             </div>
//           </article>
//         );
//       })}
//     </section>
//   );
// };
// UPDATE
const Input = () => {
  const currentSubject = useParams().subject;
  const navigate = useNavigate();
  const {
    subjects,
    isLoading,
    showAlert,
    getLocalStorage,
    setLocalStorage,
    user,
    stopLoading,

    updateTopicCoverage,
    displayCoverage,
    setLoading,
  } = useGlobalContext();
  const [math, physics, chemistry] = subjects;
  const mathTopics = math.topics;
  const physicsTopics = physics.topics;
  const chemistryTopics = chemistry.topics;
  // coverage per topic
  const mathCoverage = [...mathTopics[0].map((topic) => topic.topicCoverage)];
  const physicsCoverage = [
    ...physicsTopics[0].map((topic) => topic.topicCoverage),
  ];
  const chemistryCoverage = [
    ...chemistryTopics[0].map((topic) => topic.topicCoverage),
  ];
  // 3 arrays of subject coverage per topic also in number formate
  // console.log(mathCoverage, physicsCoverage, chemistryCoverage);
  const findAverage = (arr) => {
    const avg = arr.reduce((sum, curr) => sum + Number(curr), 0) / arr.length;
    return Math.floor(avg);
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
  // console.log(mathDataSetData);
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

  // average coverage per subject
  const mathAverageCoverage = findAverage(mathCoverage);
  const physicsAverageCoverage = findAverage(physicsCoverage);
  const chemistryAverageCoverage = findAverage(chemistryCoverage);
  const subjectAverageCoverages = [
    mathAverageCoverage,
    physicsAverageCoverage,
    chemistryAverageCoverage,
  ];
  // console.log(schoolAverageCoverage);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading();
    // IMPORTANT CODE TO WORK WITH
    const localStorage = getLocalStorage('schools');
    const currentID = user.id;
    const institution = user.institution;
    // const schoolAverageCoverage = findAverage(subjectAverageCoverages);
    // // console.log(localStorage);
    try {
      const targetSchool = localStorage.find(
        (school) => school.id === currentID
      );
      let newSchoolCoverage = '';
      if (targetSchool) {
        newSchoolCoverage = [
          ...localStorage.map((school) => {
            if (school.id === currentID) {
              return {
                ...school,
                // institution,
                // schoolAverageCoverage,
                // mathAverageCoverage,
                // physicsAverageCoverage,
                // chemistryAverageCoverage,
                subjects,
              };
            }
            return school;
          }),
        ];
      } else {
        newSchoolCoverage = [...localStorage, { ...targetSchool, subjects }];
      }
      setLocalStorage('schools', newSchoolCoverage);
      const { data } = await axios.post(`profile/`, {
        coverage: JSON.stringify(subjects),
        user: user.id,
      });

      stopLoading();
      window.location.reload();
      return navigate('/dashboard');
    } catch (error) {
      console.log(error);
      stopLoading();
    }
  };
  // const redirect = (user) => {
  //   if (user.institution === 'MOES') {
  //     // return navigate('/super');
  //     return <Navigate to='/super' replace />;
  //   }
  // };
  // FORM INPUT SUBJECT COVERAGE
  const getSubjectTopics = (arr) => {
    return arr.map((topic) => topic.title);
  };

  const mathSingleTopics = getSubjectTopics(mathTopics[0]);
  const physicsSingleTopics = getSubjectTopics(physicsTopics[0]);
  const chemistrySingleTopics = getSubjectTopics(chemistryTopics[0]);
  const allSchoolTopics = [
    ...mathSingleTopics,
    ...physicsSingleTopics,
    ...chemistrySingleTopics,
  ];

  // console.log(currentSubTopicsState);
  const currentSubjectDOM = subjects.find(
    (subject) => subject.subject === currentSubject
  );
  // const currentStateValues = [
  //   ...allSchoolTopics.map((topic) => {
  //     return { name: topic, coverage: 0 };
  //   }),
  // ];
  // const [values, setValues] = useState(currentStateValues);
  const targetTopicsStateValue = [
    ...currentSubjectDOM.topics.map((topic) => {
      return topic.map((topic) => {
        return { topic: topic.title, coverage: 0 };
      });
    }),
  ];
  const targetSubtopicsStateValue = [
    ...currentSubjectDOM.topics.map((topic) => {
      return topic.map((topic) => {
        return topic.subTopics.map((subtopic, index) => {
          return { subtopic, completed: false };
        });
      });
    }),
  ];
  const currentTopicStateValues = targetTopicsStateValue[0];
  const currentSubtopicStateValues = targetSubtopicsStateValue[0];
  // console.log(currentSubtopicStateValues);
  const [topicStateValues, setTopicStateValue] = useState(
    currentTopicStateValues
  );
  const [subTopicStateValues, setSubtopicStateValue] = useState(
    currentSubtopicStateValues
  );
  console.log(subTopicStateValues);
  // const handleRadioChange = (e) => {
  //   const updatedTopics = [
  //     ...values.map((value) => {
  //       if (value.name === e.target.name) {
  //         return { ...value, coverage: parseInt(e.target.value) };
  //       } else {
  //         return value;
  //       }
  //     }),
  //   ];
  //   const arrToUpdate = [
  //     ...mathTopics[0],
  //     ...physicsTopics[0],
  //     ...chemistryTopics[0],
  //   ];
  //   const mathLength = mathTopics[0].length;
  //   const physicsLength = physicsTopics[0].length;
  //   const chemistryLength = chemistryTopics[0].length;
  //   const lengths = { mathLength, physicsLength, chemistryLength };
  //   updateTopicCoverage(updatedTopics, arrToUpdate, lengths);
  //   setValues((state) => {
  //     return [...updatedTopics];
  //   });
  // };
  const returnCorrectBoxValue = (subTopic, topicIndex) => {
    const value = subTopicStateValues[topicIndex].find(
      (arrSubTopic) => arrSubTopic.subtopic === subTopic
    );
    // console.log(value);
    return value.completed;
  };
  const handleCheckboxChange = (e, topicIndex) => {
    const value = subTopicStateValues[topicIndex].map((arrSubTopic) => {
      if (arrSubTopic.subtopic === e.target.name) {
        return { ...arrSubTopic, completed: !arrSubTopic.completed };
      }
      return arrSubTopic;
    });
    const newSubTopicStateValues = subTopicStateValues.map((topic, index) => {
      if (index === topicIndex) {
        return value;
      }
      return topic;
    });
    setSubtopicStateValue(newSubTopicStateValues);
  };
  const handleTopicToggle = (e) => {
    const parent = e.target.parentElement.classList;
    if (parent.contains('topic-control')) {
    }
  };
  // const findUseEffectAverage = (arr) => {
  //   const avg =
  //     arr.reduce((sum, curr) => {
  //       if (curr.completed === false) {
  //         curr.completed = 0;
  //       } else {
  //         curr.completed = 100;
  //       }
  //       return sum + Number(curr.completed);
  //     }, 0) / arr.length;
  //   return avg;
  // };
  useEffect(() => {
    let subTopicsCoverageArr = subTopicStateValues.map(
      (targetAverageSubTopic) => {
        return targetAverageSubTopic.map((subTopic) => {
          return subTopic.completed;
        });
      }
    );
    subTopicsCoverageArr = subTopicsCoverageArr.map((targetAverageSubTopic) => {
      return targetAverageSubTopic.map((subTopic) => {
        if (subTopic === false) {
          subTopic = 0;
        } else {
          subTopic = 100;
        }
        return subTopic;
      });
    });
    // COVERAGE PER TOPIC
    const subTopicsAverageCoverages = subTopicsCoverageArr.map(
      (targetAverageSubTopicArray) => {
        return findAverage(targetAverageSubTopicArray);
      }
    );
    const updatedSubject = currentSubjectDOM.topics.map((topic) => {
      return topic.map((singleTopic, index) => {
        return {
          ...singleTopic,
          topicCoverage: subTopicsAverageCoverages[index],
        };
      });
    });
    // console.log(updatedSubject[0]);
    const newUpdatedSubjects = subjects.map((subject) => {
      if (subject.subject === currentSubject) {
        return { ...subject, topics: updatedSubject };
      }
      return subject;
    });
    updateTopicCoverage(newUpdatedSubjects);
  }, [subTopicStateValues]);
  const displayCurrentCoverage = async () => {
    try {
      const institution = user.institution;
      const localStorage = getLocalStorage('localStorage');
      const targetSchool = localStorage.find(
        (school) => school.institution === institution
      );
      if (targetSchool) {
        // console.log(targetSchool);
        displayCoverage(targetSchool.subjects);
        return;
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      window.location.reload();
    }
    // displayCurrentCoverage();
  }, []);
  return (
    <>
      <Navbar pageTitle='Input Form'>
        <NavLinks />
      </Navbar>
      <div className='center-div'>
        <h4>{currentSubject}</h4>
      </div>
      <Wrapper className='page'>
        <form className='job-form' onSubmit={handleSubmit}>
          <section>
            <article className='subject'>
              <div className='coverage-input'>
                {currentSubjectDOM.topics.map((topic) => {
                  return topic.map((topic, topicIndex) => {
                    return (
                      <fieldset key={topicIndex}>
                        <legend>{topic.title}</legend>
                        {topic.subTopics.map((subtopic, index) => {
                          return (
                            <article
                              key={index}
                              className={`${
                                index == '0' ? 'topic-control' : null
                              }`}
                            >
                              <input
                                type='checkbox'
                                name={subtopic}
                                id='red'
                                value={returnCorrectBoxValue(
                                  subtopic,
                                  topicIndex
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, topicIndex)
                                }
                                onClick={handleTopicToggle}
                                className='flex'
                              />
                              <label htmlFor='red'>{subtopic}</label>
                            </article>
                          );
                        })}
                        {/* <input
                          type='radio'
                          name={topic.title}
                          id='red'
                          value='0%'
                          onChange={handleRadioChange}
                          className='flex'
                        />
                        <label htmlFor='red'>0%</label>
                        <input
                          type='radio'
                          name={topic.title}
                          id='blue'
                          value='25%'
                          onChange={handleRadioChange}
                          className='flex'
                        />
                        <label htmlFor='blue'>25%</label>
                        <input
                          type='radio'
                          name={topic.title}
                          id='orange'
                          value='75%'
                          onChange={handleRadioChange}
                          className='flex'
                        />
                        <label htmlFor='orange'>75%</label>
                        <input
                          type='radio'
                          name={topic.title}
                          id='green'
                          value='100%'
                          onChange={handleRadioChange}
                          className='flex'
                        />
                        <label htmlFor='green'>100%</label> */}
                        <p>current percentage: {topic.topicCoverage}%</p>
                      </fieldset>
                    );
                  });
                })}
              </div>
            </article>
          </section>

          <button type='submit' className='btn' disabled={isLoading}>
            {isLoading ? 'submitting' : 'submit'}
          </button>
        </form>
      </Wrapper>
      <div>
        <Link to={'/dashboard'} className={`scroll-btn view2`}>
          back home
        </Link>
      </div>
    </>
  );
};
const Wrapper = styled.section`
  /* padding: 3rem 0; */
  /* margin-top: -50px; */
  fieldset {
    border: none;
    border-radius: 15px;
    padding-top: 15px;
    transition: all 0.5s;
  }
  fieldset:hover {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
  fieldset legend {
    font-weight: bolder;
    font-size: 1.5em;
    position: relative;
    top: 15px;
  }
  fieldset article {
    margin-left: 1em;
  }
  fieldset p {
    font-weight: bolder;
  }
  .topic-control {
    margin-left: 0.2em;
  }
  .job-form {
    background: var(--white);
    border-radius: var(--borderRadius);
    padding: 0 1.5rem;
    margin-bottom: 1em;
    margin-top: -5em;
    .form-input {
      padding: 0.75rem;
    }

    .form-input:focus {
      outline: 1px solid var(--primary-500);
    }
    .form-row {
      margin-bottom: 0;
    }
    .btn {
      height: 100%;
      padding: 0.75rem;
      margin-top: 0.7rem;
    }
    .flex {
      margin-right: 5px;
    }
    @media (min-width: 776px) {
      grid-template-columns: 1fr 1fr auto;
      .btn {
        height: 100%;
        padding: 1rem 2rem;
        font-size: 1.2rem;
      }
      column-gap: 2rem;
    }
  }
  .alert {
    max-width: var(--max-width);
    margin-bottom: 1rem;
  }
`;

export default Input;
