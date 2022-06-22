import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/appContext';
import FormRow from '../components/FormRow';
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
// ORIGINAL
// function Register() {
//   const [values, setValues] = useState({
//     institution: '',
//     email: '',
//     password: '',
//     isMember: true,
//   });
//   const navigate = useNavigate();
//   const { register, login, isLoading, showAlert, user } = useGlobalContext();
//   const toggleMember = () => {
//     setValues({ ...values, isMember: !values.isMember });
//   };
//   const handleChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };
//   const onSubmit = (e) => {
//     e.preventDefault();
//     let { institution, email, password, isMember } = values;
//     if (institution.includes(' ')) {
//       institution = institution.split(' ').join('_');
//     }
//     if (isMember) {
//       login({ username: institution, password }, navigate);
//     } else {
//       register({ username: institution, email, password });
//     }
//     if (user) {
//       console.log(user);
//       if (user.institution === 'MOES') {
//         navigate('/super');
//       } else {
//         navigate('/dashboard');
//       }
//     }
//   };

//   return (
//     <>
//       {user && navigate('/dashboard')}
//       <Wrapper className='page full-page'>
//         <div className='container'>
//           {showAlert && (
//             <div className='alert alert-danger'>
//               there was an error, please try again
//             </div>
//           )}
//           <form className='form' onSubmit={onSubmit}>
//             <img src={logo} alt='school-eye' className='logo home-logo' />
//             <h4>{values.isMember ? 'Login' : 'Register'}</h4>
//             {/* name field */}
//             {true && (
//               <FormRow
//                 type='name'
//                 name='institution'
//                 value={values.institution}
//                 handleChange={handleChange}
//               />
//             )}

//             {/* single form row */}
//             {!values.isMember && (
//               <FormRow
//                 type='email'
//                 name='email'
//                 value={values.email}
//                 handleChange={handleChange}
//               />
//             )}
//             {/* end of single form row */}
//             {/* single form row */}
//             <FormRow
//               type='password'
//               name='password'
//               value={values.password}
//               handleChange={handleChange}
//             />
//             {/* end of single form row */}

//             <button
//               type='submit'
//               className='btn btn-block'
//               disabled={isLoading}
//             >
//               {isLoading ? 'Fetching User...' : 'Submit'}
//             </button>
//             <p>
//               {values.isMember ? 'Not a member yet?' : 'Already a member?'}

//               <button
//                 type='button'
//                 onClick={toggleMember}
//                 className='member-btn'
//               >
//                 {values.isMember ? 'Register' : 'Login'}
//               </button>
//             </p>
//           </form>
//         </div>
//       </Wrapper>
//     </>
//   );
// }

// const Wrapper = styled.section`
//   display: grid;
//   align-items: center;
//   .logo {
//     display: block;
//     margin: 0 auto;
//     margin-bottom: 1.38rem;
//   }
//   .form {
//     max-width: 400;
//     border-top: 5px solid var(--primary-500);
//   }

//   h4 {
//     text-align: center;
//   }
//   p {
//     margin: 0;
//     margin-top: 1rem;
//     text-align: center;
//   }
//   .btn {
//     margin-top: 1rem;
//   }
//   .member-btn {
//     background: transparent;
//     border: transparent;
//     color: var(--primary-500);
//     cursor: pointer;
//   }
// `;
// UPDATE
function Register() {
  const [values, setValues] = useState({
    institution: '',
    email: '',
    password: '',
    region: '',
    isMember: true,
  });
  const navigate = useNavigate();
  const { register, login, isLoading, showAlert, user } = useGlobalContext();
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let { institution, email, password, isMember, region } = values;
    if (institution.includes(' ')) {
      institution = institution.split(' ').join('_');
    }
    if (region.includes(' ')) {
      region = region.split(' ').join('_');
    }
    if (isMember) {
      login({ email, password }, navigate);
    } else {
      register({ name: institution, email, password, region });
    }
    if (user) {
      console.log(user);
      if (user.institution === 'MOES') {
        navigate('/super');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <>
      {user && navigate('/dashboard')}
      <Wrapper className='page full-page'>
        <div className='container'>
          {showAlert && (
            <div className='alert alert-danger'>
              there was an error, please try again
            </div>
          )}
          <form className='form' onSubmit={onSubmit}>
            <img src={logo} alt='school-eye' className='logo home-logo' />
            <h4>{values.isMember ? 'Login' : 'Register'}</h4>
            {/* name field */}
            {!values.isMember && (
              <FormRow
                type='name'
                name='institution'
                value={values.institution}
                handleChange={handleChange}
              />
            )}

            {/* single form row */}
            <FormRow
              type='email'
              name='email'
              value={values.email}
              handleChange={handleChange}
            />
            {/* end of single form row */}
            {/* single form row */}
            <FormRow
              type='password'
              name='password'
              value={values.password}
              handleChange={handleChange}
            />
            {/* end of single form row */}
            {!values.isMember && (
              <FormRow
                type='name'
                name='region'
                value={values.region}
                handleChange={handleChange}
              />
            )}
            <button
              type='submit'
              className='btn btn-block'
              disabled={isLoading}
            >
              {isLoading ? 'Fetching User...' : 'Submit'}
            </button>
            <p>
              {values.isMember ? 'Not a member yet?' : 'Already a member?'}

              <button
                type='button'
                onClick={toggleMember}
                className='member-btn'
              >
                {values.isMember ? 'Register' : 'Login'}
              </button>
            </p>
          </form>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400;
    border-top: 5px solid var(--primary-500);
  }

  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
  }
`;

export default Register;
