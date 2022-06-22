import { Link } from 'react-router-dom';
import styled from 'styled-components';
import main from '../assets/main.svg';
import { useGlobalContext } from '../context/appContext';
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <>
      {user && navigate('/dashboard')}

      <Wrapper>
        <nav>
          <img src={logo} alt='school-eye' className='home-logo' />
        </nav>
        <div className='container page'>
          <div className='info'>
            <h1>school eye app</h1>
            <p>Project School Eye entails an interface that is customized for the Ministry of Education and Sports to monitor syllabus coverage on a national scale. According to the Sustainable Development Goals released by the United Nations; the fourth /SDG is to “Ensure inclusive and equitable quality education and promote lifelong learning for all.”
This interface seeks to provide an integrated education easily monitored by NCDC standards. Quality means the degree of excellence of something which this project depicts. In that the Ministry of Education and Sports shall have supervisory rights for the curriculum taught to its citizens hence providing Quality Education as envisioned by SDG 4. This project was brought to reality by three people namely; Ssonko Julian Paul, Egeru Brighton and Mutumba Nicholas Kaddu.</p>

            <Link to='/register' className='btn hero-btn'>
              Login / Register
            </Link>
          </div>
          <img src={main} alt='twazekola' className='img main-img' />
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  margin-bottom: 50px;
  .container {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: 6rem;
    display: flex;
    align-items: center;
    margin-bottom:50px;
  }
  h1 {
    font-weight: 700;
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .container {
      grid-template-columns: 1fr 1fr;
      column-gap: 6rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Home;
