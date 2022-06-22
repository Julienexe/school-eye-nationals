import axios from 'axios';
import '../axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Navigate } from 'react-router-dom';
import { useTable } from 'react-table';
import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_ERROR,
  CLEAR_ERROR_MESSAGE,
  SET_FILTERED_SCHOOLS,
  SET_USER,
  UPDATE_SCHOOLS_COVERAGE,
  STOP_LOADING,
  LOAD_SCHOOLS,
  MINISTRY_LOGGED_IN,
  SHOW_CURRENT_COVERAGE,
  UPDATE_SCHOOL_STUDENTS,
} from './actions';
import reducer from './reducer';
// import Schools from '../assets/sampleSchools';
import topics from '../assets/layup';

const initialState = {
  user: null,
  isLoading: false,
  isMinistry: false,
  filteredSchools: [],
  showAlert: false,
  students: [],
  editItem: null,
  singleJobError: false,
  editComplete: false,
  subjects: topics,
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const regions = ['central', 'western', 'eastern', 'northern'];
  // let Schools = getLocalStorage('schools');
  const [state, dispatch] = useReducer(reducer, initialState);
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };
  const stopLoading = () => {
    dispatch({ type: STOP_LOADING });
  };
  const getLocalStorage = (key) => {
    const storageData = JSON.parse(localStorage.getItem(key));
    return storageData ? storageData : [];
  };
  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const Schools = getLocalStorage('schools');

  const getAllUsers = async () => {
    setLoading();
    try {
      let { data } = await axios.get('users/');
      let coverage = await axios.get('profile/');
      let allStudents = await axios.get('student/');
      let newCoverage = coverage.data.map((school) => {
        for (const key in school) {
          const value = school[key];
          school[key] = eval(value);
        }
        return school;
      });
      // console.log(newCoverage);
      // console.log(data);
      data = data.filter((school) => school.email !== 'pro@education.go.ug');

      const updatedData = data.map((school) => {
        // console.log(school);
        // const coverageProfiles = newCoverage.filter(
        //   (profile) => profile.coverage
        // );
        // console.log(coverageProfiles);
        const currentUserStudents = [
          ...allStudents.data.filter((student) => student.school === school.id),
        ];
        let currentProfile = newCoverage.find(
          (profile) => profile.user === school.id
        );
        if (!currentProfile.coverage) {
          currentProfile = { ...currentProfile, coverage: topics };
        }
        // console.log(currentProfile);
        const { coverage } = currentProfile;

        const [math, physics, chemistry] = coverage;
        const mathTopics = math.topics;
        const physicsTopics = physics.topics;
        const chemistryTopics = chemistry.topics;

        // coverage per topic
        const mathCoverage = [
          ...mathTopics[0].map((topic) => topic.topicCoverage),
        ];
        const physicsCoverage = [
          ...physicsTopics[0].map((topic) => topic.topicCoverage),
        ];
        const chemistryCoverage = [
          ...chemistryTopics[0].map((topic) => topic.topicCoverage),
        ];
        const findAverage = (arr) => {
          const avg =
            arr.reduce((sum, curr) => sum + Number(curr), 0) / arr.length;
          return Math.floor(avg);
        };

        const mathAverageCoverage = findAverage(mathCoverage);
        const physicsAverageCoverage = findAverage(physicsCoverage);
        const chemistryAverageCoverage = findAverage(chemistryCoverage);
        const schoolAverageCoverage = findAverage([
          mathAverageCoverage,
          physicsAverageCoverage,
          chemistryAverageCoverage,
        ]);

        const newName = school.name.split('_').join(' ');
        return {
          ...school,
          name: newName,
          coverage: schoolAverageCoverage,
          math: mathAverageCoverage,
          physics: physicsAverageCoverage,
          chemistry: chemistryAverageCoverage,
          students: currentUserStudents,
          subjects: coverage,
        };
      });
      console.log();
      setLocalStorage('schools', updatedData);
      // setLocalStorage('localStorage', updatedData.subjects);
      // const currentUserCoverage = updatedData.find(
      //   (school) => school.id === state.user.id
      // );
      // dispatch({
      //   type: UPDATE_SCHOOLS_COVERAGE,
      //   payload: currentUserCoverage.subjects,
      // });
      dispatch({ type: LOAD_SCHOOLS, payload: updatedData });
      stopLoading();
    } catch (error) {
      // console.log(error);
      stopLoading();
    }
  };
  const displaySchools = (filteredArr) => {
    setLoading();
    dispatch({ type: SET_FILTERED_SCHOOLS, payload: filteredArr });
    stopLoading();
  };
  // const updateTopicCoverage = (
  //   updatedTopicsAndCoverage,
  //   currentTopicsAndCoverage,
  //   lengths
  // ) => {
  //   const { mathLength, physicsLength, chemistryLength } = lengths;
  //   const updatedList = [
  //     ...currentTopicsAndCoverage.map((thisTopic, index) => {
  //       return {
  //         ...thisTopic,
  //         topicCoverage: updatedTopicsAndCoverage[index].coverage,
  //       };
  //     }),
  //   ];
  //   const mathUpdated = updatedList.slice(0, mathLength);
  //   const physicsUpdated = updatedList.slice(
  //     mathLength,
  //     mathLength + physicsLength
  //   );
  //   const chemistryUpdated = updatedList.slice(
  //     mathLength + physicsLength,
  //     chemistryLength + mathLength + physicsLength
  //   );

  //   // console.log(mathUpdated, physicsUpdated, chemistryUpdated);
  //   const updatedSubject = state.subjects.map((subject) => {
  //     if (subject.subject === 'math') {
  //       return { ...subject, topics: [mathUpdated] };
  //     } else if (subject.subject === 'physics') {
  //       return { ...subject, topics: [physicsUpdated] };
  //     } else if (subject.subject === 'chemistry') {
  //       return { ...subject, topics: [chemistryUpdated] };
  //     }
  //     return subject;
  //   });

  //   dispatch({ type: UPDATE_SCHOOLS_COVERAGE, payload: updatedSubject });
  // };
  // UPDATED UPDATE SCHOOL COVERAGE
  const updateTopicCoverage = (updatedSubjects) => {
    // const { mathLength, physicsLength, chemistryLength } = lengths;
    // const updatedList = [
    //   ...currentTopicsAndCoverage.map((thisTopic, index) => {
    //     return {
    //       ...thisTopic,
    //       topicCoverage: updatedTopicsAndCoverage[index].coverage,
    //     };
    //   }),
    // ];
    // const mathUpdated = updatedList.slice(0, mathLength);
    // const physicsUpdated = updatedList.slice(
    //   mathLength,
    //   mathLength + physicsLength
    // );
    // const chemistryUpdated = updatedList.slice(
    //   mathLength + physicsLength,
    //   chemistryLength + mathLength + physicsLength
    // );

    // // console.log(mathUpdated, physicsUpdated, chemistryUpdated);
    // const updatedSubject = state.subjects.map((subject) => {
    //   if (subject.subject === 'math') {
    //     return { ...subject, topics: [mathUpdated] };
    //   } else if (subject.subject === 'physics') {
    //     return { ...subject, topics: [physicsUpdated] };
    //   } else if (subject.subject === 'chemistry') {
    //     return { ...subject, topics: [chemistryUpdated] };
    //   }
    //   return subject;
    // });

    dispatch({ type: UPDATE_SCHOOLS_COVERAGE, payload: updatedSubjects });
  };

  const authenticateSuperUser = (user, navigate) => {
    const minUser = state.user;
    if (!minUser) {
      dispatch({ type: REGISTER_USER_ERROR });
      const timeOut = setTimeout(() => {
        dispatch({ type: CLEAR_ERROR_MESSAGE });
        return clearTimeout(timeOut);
      }, 2000);
      navigate('/register');
    } else {
      if (user.email !== 'pro@education.go.ug') {
        dispatch({ type: REGISTER_USER_ERROR });

        const timeOut = setTimeout(() => {
          dispatch({ type: CLEAR_ERROR_MESSAGE });
          return clearTimeout(timeOut);
        }, 2000);
        navigate('/register');
      } else {
        return;
      }
    }
  };
  // register
  const register = async (userInput) => {
    setLoading();
    // Local storage Code
    // let users = getLocalStorage('users');

    // const { institution, email, password } = userInput;
    // if (!institution || !password || !email) {
    //   dispatch({ type: REGISTER_USER_ERROR });
    //   const timeOut = setTimeout(() => {
    //     dispatch({ type: CLEAR_ERROR_MESSAGE });
    //     return clearTimeout(timeOut);
    //   }, 1000);
    // } else {
    //   const user = users.find((user) => user.email === email);
    //   if (user) {
    //     localStorage.setItem('user', JSON.stringify(user));
    //     dispatch({
    //       type: REGISTER_USER_SUCCESS,
    //       payload: { institution: user.institution, email: user.email },
    //     });
    //   } else {
    //     users = [...users, { institution, email, password }];
    //     localStorage.setItem('users', JSON.stringify(users));
    //     localStorage.setItem('user', JSON.stringify({ institution, email }));
    //     dispatch({
    //       type: REGISTER_USER_SUCCESS,
    //       payload: { institution, email },
    //     });
    //   }
    // }
    // Axios code
    try {
      let {
        data: { name, email, id },
      } = await axios.post(`register/`, {
        ...userInput,
      });
      name = name.split('_').join(' ');
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { institution: name, email, id },
      });
      // dispatch({
      //   type: SHOW_CURRENT_COVERAGE,
      //   payload: topics,
      // });
      localStorage.setItem(
        'user',
        JSON.stringify({ institution: name, email, id })
      );
      window.location.reload();
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR });
      const timeOut = setTimeout(() => {
        dispatch({ type: CLEAR_ERROR_MESSAGE });
        return clearTimeout(timeOut);
      }, 2000);
    }
  };

  // login
  const login = async (userInput, navigate) => {
    setLoading();
    // Local storage code
    // const { password, email } = userInput;
    // if (!password || !email) {
    //   dispatch({ type: REGISTER_USER_ERROR });
    //   const timeOut = setTimeout(() => {
    //     dispatch({ type: CLEAR_ERROR_MESSAGE });
    //     return clearTimeout(timeOut);
    //   }, 1000);
    // }
    // const users = getLocalStorage('users');
    // const user = users.find((user) => user.email === email);
    // if (!user) {
    //   dispatch({ type: REGISTER_USER_ERROR });
    //   const timeOut = setTimeout(() => {
    //     dispatch({ type: CLEAR_ERROR_MESSAGE });
    //     return clearTimeout(timeOut);
    //   }, 1000);
    // } else {
    //   if (user.password === password) {
    //     localStorage.setItem('user', JSON.stringify(user));
    //     dispatch({
    //       type: REGISTER_USER_SUCCESS,
    //       payload: { institution: user.institution, email: user.email },
    //     });
    //   } else {
    //     dispatch({ type: REGISTER_USER_ERROR });
    //     const timeOut = setTimeout(() => {
    //       dispatch({ type: CLEAR_ERROR_MESSAGE });
    //       return clearTimeout(timeOut);
    //     }, 1000);
    //   }
    // }

    try {
      const { data } = await axios.post(`login/`, {
        ...userInput,
      });
      // please return user id
      let { email, institution, id } = data;

      institution = institution.split('_').join(' ');
      if (email === 'pro@education.go.ug') {
        dispatch({ type: MINISTRY_LOGGED_IN });
      }
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { institution, email, id },
      });
      localStorage.setItem('user', JSON.stringify({ institution, email, id }));
      // if (state.user && state.user.email === 'pro@education.go.ug') {
      //   return navigate('/super');
      //   // return <Navigate to='/super' replace />;
      // }
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR });
      const timeOut = setTimeout(() => {
        dispatch({ type: CLEAR_ERROR_MESSAGE });
        return clearTimeout(timeOut);
      }, 2000);
    }
  };

  // logout
  const logout = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('schools');
    // const { data } = await axios.post('logout/');
    // console.log(data);
    dispatch({ type: LOGOUT_USER });
    return <Navigate to='/register' replace />;
  };

  // // fetch jobs
  // const fetchJobs = async () => {
  //   setLoading()
  //   try {
  //     const { data } = await axios.get(`/jobs`)
  //     dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.jobs })
  //   } catch (error) {
  //     dispatch({ type: FETCH_JOBS_ERROR })
  //     logout()
  //   }
  // }

  // // create job
  // const createJob = async (userInput) => {
  //   setLoading()
  //   try {
  //     const { data } = await axios.post(`/jobs`, {
  //       ...userInput,
  //     })

  //     dispatch({ type: CREATE_JOB_SUCCESS, payload: data.job })
  //   } catch (error) {
  //     dispatch({ type: CREATE_JOB_ERROR })
  //   }
  // }
  // const deleteJob = async (jobId) => {
  //   setLoading()
  //   try {
  //     await axios.delete(`/jobs/${jobId}`)

  //     fetchJobs()
  //   } catch (error) {
  //     dispatch({ type: DELETE_JOB_ERROR })
  //   }
  // }

  // const fetchSingleJob = async (jobId) => {
  //   setLoading()
  //   try {
  //     const { data } = await axios.get(`/jobs/${jobId}`)
  //     dispatch({ type: FETCH_SINGLE_JOB_SUCCESS, payload: data.job })
  //   } catch (error) {
  //     dispatch({ type: FETCH_SINGLE_JOB_ERROR })
  //   }
  // }
  // const editJob = async (jobId, userInput) => {
  //   setLoading()
  //   try {
  //     const { data } = await axios.patch(`/jobs/${jobId}`, {
  //       ...userInput,
  //     })
  //     dispatch({ type: EDIT_JOB_SUCCESS, payload: data.job })
  //   } catch (error) {
  //     dispatch({ type: EDIT_JOB_ERROR })
  //   }
  // }

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const newUser = JSON.parse(user);
      dispatch({ type: SET_USER, payload: newUser });
    }
  }, []);
  // const displayCoverage = (newSubjects) => {
  //   dispatch({ type: SHOW_CURRENT_COVERAGE, payload: newSubjects });
  // };

  useEffect(() => {
    getAllUsers();
    // console.log(topics);
    // console.log(state.user);
    if (state.user && state.user.email !== 'pro@education.go.ug') {
      const dataBaseCoverages = getLocalStorage('schools');
      const currentUserCoverage = dataBaseCoverages.find(
        (school) => school.id === state.user.id
      );
      dispatch({
        type: UPDATE_SCHOOLS_COVERAGE,
        payload: currentUserCoverage.subjects,
      });
      dispatch({
        type: UPDATE_SCHOOL_STUDENTS,
        payload: currentUserCoverage.students,
      });

      // console.log(currentUserCoverage);
    }
    if (state.user && state.user.email === 'pro@education.go.ug') {
      dispatch({
        type: UPDATE_SCHOOLS_COVERAGE,
        payload: topics,
      });
    }
  }, [state.user]);
  return (
    <AppContext.Provider
      value={{
        ...state,
        logout,
        login,
        Schools,
        displaySchools,
        register,
        authenticateSuperUser,
        updateTopicCoverage,
        getAllUsers,
        getLocalStorage,
        setLoading,
        stopLoading,
        setLocalStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
