import React, { useEffect, useState } from 'react'
import './DisplayContacts.scss'
function DisplayContacts(props) {
  const [state, setState] = useState({
    jsonData: [],
    filteredResult: [],
    searchInput: "",
    page: 1,
    totalPages: 0
  })

  useEffect(() => {
    let somedata = [];
    if (state.searchInput !== '') {
      const filteredData = state.jsonData.filter((contact) => {
        return contact.firstName.toLowerCase().includes(state.searchInput.toLowerCase())
      })
      somedata = filteredData;
    }
    else {
      somedata = state.jsonData
    }

    setState(state => ({
      ...state, filteredResult: somedata
    }))
    console.log(state)
  }, [state.searchInput]);

  useEffect(() => {
    const getContactsData = async () => {
      const data = await fetch("https://dummyjson.com/users?limit=100");
      const data1 = await data.json();
      const json = data1.users;
      setState(state => ({
        ...state, jsonData: json
      }))
    }
    getContactsData();
  }, [])

  useEffect(() => {
    setState(state => ({
      ...state, filteredResult: state.jsonData
    }))
  }, [state.jsonData])

  useEffect(() => {
    let count = Math.ceil(state.filteredResult.length / 10)
    setState(state => ({
      ...state, totalPages: count, page: 1
    }))
    console.log(count)
  }, [state.filteredResult])


  const onchange = (e) => {
    setState(state => ({
      ...state, searchInput: e.target.value
    }))
  }

  const selectedPageHandler = (selectedPage) => {
    console.log(selectedPage)
    if (selectedPage >= 1 && selectedPage <= state.totalPages && selectedPage !== state.page)
      setState(state => ({
        ...state, page: selectedPage
      }))
  }

  //Gender filter


const genderCount = {};
  state.filteredResult.forEach(function(i){
    genderCount[i.gender] ? genderCount[i.gender]++ : genderCount[i.gender] = 1;
  });
  console.log(genderCount)
  console.log(genderCount.male, genderCount.female)
  let message= " ";
  if(state.searchInput === ""){
    message= <p>Let's Find your Male & Female Friends</p>;
  }
  else{
    if(genderCount.male > 0){
      if(genderCount.female >0){
        message = <p>You have {genderCount.male} Male and {genderCount.female} Female Friends</p>
      }else{
        message =<p>You have only {genderCount.male} male friends</p>
      }
    }
    else if(genderCount.female > 0){
      if(genderCount.male >0){
        message = <p>You have {genderCount.male} Male and {genderCount.female} Female Friends</p>
      }else{
        message =<p>You have only {genderCount.female} female friends</p>
      }
    }
    else{
      message= <p>Your friend's name does not exist in our records </p>;
    }
  }





  return (
    <div className="mh200">
      <div className='user-input-area'>
        <input type="text" placeholder='search here...' value={state.searchInput} onChange={onchange} />
        {message}
      </div>
      <div>
      
      </div>
      <div className='flex-container'>
        {
          state.filteredResult.slice(state.page * 10 - 10, state.page * 10).map((contact) => {
            return (
              <div className='flex-item' key={contact.id}>
                <li><b>User Name : </b>{contact.firstName}</li>
                <li><b>Email: </b>{contact.email}</li>
                <li><b>Gender: </b>{contact.gender}</li>
              </div>
            )
          })
        }
      </div>
   
        {
          state.totalPages > 0 && <div className='pagination'>
            <span className={state.page > 1 ? "" : "pagination__disable"} onClick={() => selectedPageHandler(state.page - 1)}>Previous</span>
            {[...Array(state.totalPages)].map((_, i) =>{
                  return <span className={state.page === i+1 ? "pagination__selected" : ""} key={i} onClick={() => selectedPageHandler(i+1)} >{i+1}</span>
              })} 
            <span className={state.page < state.totalPages ? "" : "pagination__disable"} onClick={() => selectedPageHandler(state.page + 1)}>Next</span>
          </div>
        }
      </div>)
}
export default DisplayContacts