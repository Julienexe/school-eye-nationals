import React from 'react';
import FormRow from '../components/FormRow';
import { useState } from 'react';
import { useGlobalContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// chart-container , chart-container-ministry
const currentState = {
  first_name: '',
  given_name: '',
  ID_Number: '',
  combination: '',
  DOB: '',
};

const one = {
  first_name: 'Akandwaho',
  given_name: 'Allan',
  ID_Number: '57',
  combination: 'HEG',
  score: '76',
  DOB: '07/01/2002',
  user_id: '18',
};

const StudentFormInput = () => {
  const [state, setState] = useState(currentState);
  const { isLoading, setLoading, stopLoading, user } = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    let name = e.target.name;
    if (name === 'first name') {
      name = 'first_name';
    } else if (name === 'given name') {
      name = 'given_name';
    } else if (name === 'ID number') {
      name = 'ID_Number';
    }
    setState((current) => {
      return { ...current, [name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomScore = Math.floor(Math.random() * 100);
    setLoading();
    console.log(state);
    try {
      const { data } = await axios.post('student/', {
        ...state,
        score: randomScore,
        user_id: user.id,
      });
      console.log(data);
      setState((currentState) => {
        return {
          first_name: '',
          given_name: '',
          ID_Number: '',
          DOB: '',
          combination: '',
        };
      });
      stopLoading();
      // window.location.reload();
      // return navigate('/dashboard');
    } catch (error) {
      stopLoading();
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <section className='chart-container-student'>
        <FormRow
          type='name'
          name='first name'
          value={state.first_name}
          handleChange={handleChange}
        />
        <FormRow
          type='name'
          name='given name'
          value={state.given_name}
          handleChange={handleChange}
        />
        <FormRow
          type='text'
          name='ID number'
          value={state.ID_Number}
          handleChange={handleChange}
        />
        <FormRow
          type='text'
          name='combination'
          value={state.combination}
          handleChange={handleChange}
        />
        <FormRow
          type='date'
          name='DOB'
          value={state.DOB}
          handleChange={handleChange}
        />
      </section>
      <button
        // type='submit'
        className='btn'
        disabled={isLoading}
      >
        {isLoading ? 'submitting' : 'submit'}
      </button>
    </form>
  );
};

export default StudentFormInput;
