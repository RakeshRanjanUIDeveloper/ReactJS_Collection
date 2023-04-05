import React from 'react'
import './DisplayContacts.scss';
import contactData from '../../contacts-data/contacts.json';

function DisplayContacts(props) {
  return (
    <>
          <div className="min-height">
            <div className='card-header'>Display All Contacts</div>
                { contactData?.length ? 
                   <div className='card-block'>
                      {
                        contactData?.map((item, key) => {
                          return (
                            <div className='card-main' key={key}>
                              <h3 className='name-block'><span>Name :</span> {item.username}</h3>
                              <h3 className='email-block'><span>Email :</span> {item.email}</h3>
                              <h3 className='contact-block'><span>Contact :</span> {item.contact}</h3>

                            </div>
                          )
                        })
                      }
                    </div>
                : 
                <div className='no-card-block'>
                  <p className='no-card'> No cards can be found yet !!</p>
                </div>
              }
           
          </div>
    </>

  )
}

export default DisplayContacts