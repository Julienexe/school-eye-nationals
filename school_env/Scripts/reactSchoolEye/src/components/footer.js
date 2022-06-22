import React from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaCopyright,
} from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
const Footer = () => {
  return (
    <>
      <section className='footer-section'>
        <footer className='footer'>
          <div className='footer-element'>
            <BsFillTelephoneFill className='contact-icon' />
            <p>+2567808478909</p>
          </div>
          <div className='footer-element'>
            <FaFacebook className='contact-icon' />
            <p>schooleye</p>
          </div>
          <div className='footer-element'>
            <FaInstagram className='contact-icon' />
            <p>schooleye</p>
          </div>
          <div className='footer-element'>
            <FaLinkedin className='contact-icon' />
            <p>schooleye</p>
          </div>
          <div className='footer-element'>
            <SiGmail className='contact-icon' />
            <p>schooleye549@gmail.com</p>
          </div>
        </footer>
        <article className='footer-element copyright'>
          <FaCopyright className='contact-icon' />
          <p className='contact-icon'>SMACK ICT CLUB</p>
        </article>
        <a href='https://www.education.go.ug/' target='_blank'>
          EBPSALM
        </a>
      </section>
    </>
  );
};

export default Footer;
