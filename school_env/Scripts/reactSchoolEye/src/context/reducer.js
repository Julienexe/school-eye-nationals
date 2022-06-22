import topics from '../assets/layup';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  SET_USER,
  LOGOUT_USER,
  SET_LOADING,
  CLEAR_ERROR_MESSAGE,
  SET_FILTERED_SCHOOLS,
  USER_ALREADY_EXISTS,
  UPDATE_SCHOOLS_COVERAGE,
  STOP_LOADING,
  LOAD_SCHOOLS,
  MINISTRY_LOGGED_IN,
  SHOW_CURRENT_COVERAGE,
  UPDATE_SCHOOL_STUDENTS,
} from './actions';

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true, showAlert: false, editComplete: false };
  }
  if (action.type === UPDATE_SCHOOL_STUDENTS) {
    return { ...state, students: action.payload };
  }
  if (action.type === MINISTRY_LOGGED_IN) {
    return {
      ...state,
      isMinistry: true,
    };
  }
  if (action.type === SHOW_CURRENT_COVERAGE) {
    return { ...state, subjects: action.payload };
  }
  if (action.type === STOP_LOADING) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      editComplete: false,
    };
  }
  if (action.type === LOAD_SCHOOLS) {
    return {
      ...state,
      loading: false,
      filteredSchools: action.payload.slice(0, 5),
    };
  }
  if (action.type === CLEAR_ERROR_MESSAGE) {
    return { ...state, showAlert: false };
  }
  if (action.type === SET_FILTERED_SCHOOLS) {
    return { ...state, filteredSchools: action.payload };
  }
  if (action.type === UPDATE_SCHOOLS_COVERAGE) {
    return { ...state, subjects: action.payload };
  }
  // if(action.type === USER_ALREADY_EXISTS){
  //   return { ...state, isLoading: false, user: null, showAlert: true };
  // }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      user: null,
      showAlert: true,
    };
  }

  if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      showAlert: false,
      jobs: [],
      isEditing: false,
      editItem: null,
      isMinistry: false,
    };
  }

  // if (action.type === FETCH_JOBS_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     editItem: null,
  //     singleJobError: false,
  //     editComplete: false,
  //     jobs: action.payload,
  //   };
  // }
  // if (action.type === FETCH_JOBS_ERROR) {
  //   return { ...state, isLoading: false };
  // }
  // if (action.type === CREATE_JOB_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     jobs: [...state.jobs, action.payload],
  //   };
  // }
  // if (action.type === CREATE_JOB_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //   };
  // }

  // if (action.type === DELETE_JOB_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //   };
  // }

  // if (action.type === FETCH_SINGLE_JOB_SUCCESS) {
  //   return { ...state, isLoading: false, editItem: action.payload };
  // }
  // if (action.type === FETCH_SINGLE_JOB_ERROR) {
  //   return { ...state, isLoading: false, editItem: '', singleJobError: true };
  // }

  // if (action.type === EDIT_JOB_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     editComplete: true,
  //     editItem: action.payload,
  //   };
  // }
  // if (action.type === EDIT_JOB_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     editComplete: true,
  //     showAlert: true,
  //   };
  // }
  throw new Error(`no such action : ${action}`);
};

export default reducer;
