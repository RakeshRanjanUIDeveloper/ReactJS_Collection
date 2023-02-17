import React, { useState } from 'react'
import './../Footer/Footer.scss';
import footerlogo from '../../assets/images/logo.png'
import * as Icon from 'react-bootstrap-icons'; 
const Footer = () => {
  const [isShown, setIsShown] = useState(false);
  return (
    <React.Fragment>
      <footer className="footer-sec">
        <div className="main">
          <div className="logo row">
          <div className="footer-header">
            <img src={footerlogo} className="manik" alt="" />
          </div>
          <div className="logo-des">
            <p>When the Earth is threatened by the evil Troobian empire, the SPD (Space Patrol Delta) police force recruits a team of Power Rangers to help defend the planet. </p>
            <a href="JavaScript:void(0);" className="btn-know">Know More</a>
          </div>
        </div>
        <div className="office row">
          <div className="footer-header">
            <h3>Office</h3>
          </div>
          <div className="office-des">
            <p>Karnataka<br />Bangalore<br />Marathahalli<br />560037</p>
            <a href="#">rakeshmodi034@gmail.com</a>
            <p class = "num">+91-9986961101</p>
          </div>
        </div>
        <div className="link row">
          <div className="footer-header">
            <h3>Contact US</h3>
          </div>
          <div className="link-des">
            <div>
                <Icon.TelephonePlusFill size="40" href="#" className="footer-links" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}></Icon.TelephonePlusFill>
                {isShown && <div>Call</div>}
            </div>
            <div>
                <Icon.Mailbox2 size="40" href="#" className="footer-links" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}></Icon.Mailbox2>
                {isShown && <div>Mail</div>}
            </div>

          </div>
          
        </div>
        
        
        <div className="newsletter row">
          <div className="footer-header">
            <h3>Get Social</h3>
          </div>
          <div className="newsletter-des">
            <div className="subcribe"><i className="sub-icon ri-mail-check-fill"></i>
              <input type="mail" placeholder = "Enter Email ID" required />
              <i className="sub-icon ri-arrow-right-line"></i>
            </div>
            <div className="icons">
              <a href="#"><Icon.Facebook size="30" className='social-icon' /></a>
              <a href="#"><Icon.Instagram size="30" className='social-icon' /></a>
              <a href="#"><Icon.Linkedin size="30" className='social-icon' /></a>
              <a href="#"><Icon.Github size="30" className='social-icon'/></a>
              
            </div>
          </div>
        </div>
        
        
      </div>
      <div className="copyright">
      <hr />
      
      <p>© Copyright 2023 Power Ranger SPD.</p>
      </div>
      </footer>
    </React.Fragment>
  )
}

export default Footer