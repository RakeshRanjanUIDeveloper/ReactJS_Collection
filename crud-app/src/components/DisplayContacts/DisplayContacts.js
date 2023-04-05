import React, { useEffect, useState } from 'react'
import './DisplayContacts.scss'

function DisplayContacts(props) {
  const [state, setState] = useState({
    jsonData:[],
    filteredResult: [],
    searchInput: ""
  })
  useEffect(() => {
    getContactsData();
    let somedata = [];
    console.log(state.searchInput)
    if(state.searchInput !== ''){
      const filteredData = state.jsonData.filter((contact) =>{
         return contact.username.toLowerCase().includes(state.searchInput.toLowerCase())
      })
      somedata = filteredData;
    }else{
     somedata= state.jsonData
    }
    setState(state => ({
      ...state, filteredResult:somedata
    }))
    console.log(state)
  }, [state.searchInput]);
  async function getContactsData() {
    const data = await fetch("https://jsonplaceholder.typicode.com/users");
    const json = await data.json();
    setState(state => ({
      ...state, jsonData:json
    }))
  }

  const onchange = (e) => {
    setState(state => ({
      ...state, searchInput:e.target.value
    }))
  }

  // const searchItems = () =>{

  //   console.log(state)
  // }
  // const handleSortName = () => {
  //   if(searchInput !== ''){
  //     const filteredData = jsonData.filter((contact) =>{
  //        return contact.username.toLowerCase().includes(searchInput.toLowerCase())
  //     })
  //     setFilteredResult(filteredData.sort((a,b) => a.username.localeCompare(b.name)))
  //   }else{
  //     setFilteredResult(jsonData.sort((a,b) => a.username.localeCompare(b.name)))
  //   }
  // }
  return (
    <div className="mh200">
    <div className='user-input-area'>
        <input type="text" placeholder='search here...' value={state.searchInput} onChange={onchange} /> 
     
    </div>

        <div className='grid-container'>
                {
                  state.searchInput.length >= 1 ? (
                    state.filteredResult.map((contact) =>{
                      return (
                        <div className='grid-item' key={contact.id}>
                            <li><b>User Name : </b>{contact.username}</li>
                            <li><b>Email: </b>{contact.email}</li>
                            <li><b>Company: </b>{contact.company.name}</li>
                      </div>
                      )
                    })
                  ):(
                    state.jsonData.map((contact) =>{
                      return (
                        <div className='grid-item' key={contact.id}>
                            <li><b>User Name : </b>{contact.username}</li>
                            <li><b>Email: </b>{contact.email}</li>
                            <li><b>Company: </b>{contact.company.name}</li>
                      </div>
                      )
                    })
                  )
                }
        </div>
    </div>
  )
}

export default DisplayContacts