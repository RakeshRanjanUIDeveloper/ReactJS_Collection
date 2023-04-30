import React from 'react';
import "./Home.scss";
import contactLogo from '../../assets/images/contact-icon.png'

function Home() {
  return (
    <>
      <div className="min-height">
        <div className='header-block'>
          <h1>CRUD Application for Contact Manager</h1>
          <p>Your one stop solution for contact management applications like creating contacts, displaying contacts and deleting contacts.</p>
          <img src={contactLogo} className='contact-block' alt='logo'/>
          <h2>Click on the second navicon on left to start exploring !!</h2>
        </div>
      </div>
    </>
  )
}

export default Home