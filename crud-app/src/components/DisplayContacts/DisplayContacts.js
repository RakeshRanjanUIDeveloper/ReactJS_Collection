import React, { useEffect, useState } from 'react'
import './DisplayContacts.scss'
function DisplayContacts(props) {
  const [state, setState] = useState({
    jsonData:[],
    filteredResult: [],
    searchInput: "",
    page: 1,
    totalPages: 0
  })  

  useEffect(() => {
    getContactsData();
    let somedata = [];
    if(state.searchInput !== ''){
      const filteredData = state.filteredResult.filter((contact) =>{
         return contact.username.toLowerCase().includes(state.searchInput.toLowerCase())
      })
      console.log(state.searchInput)
      somedata = filteredData;
    }else{
     somedata= state.jsonData
    }
    setState(state => ({
      ...state, filteredResult:somedata
    }

    ))
    console.log(somedata)
  }, [state.searchInput]);

  useEffect(() =>{
     setState(state => ({
      ...state, filteredResult:state.jsonData
    }))
  }, [state.jsonData])

  useEffect(() =>{
    let count = state.filteredResult.length/10
    setState(state => ({
     ...state, totalPages:count, page:1
   }))
 }, [state.totalPages])
 
  async function getContactsData() {
    const data = await fetch("https://dummyjson.com/users?limit=100");
    const data1 = await data.json();
    const json = data1.users;
    setState(state => ({
      ...state, jsonData:json
    }))
  }
  const onchange = (e) => {
    setState(state => ({
      ...state, searchInput:e.target.value
    }))
  }

  const selectedPageHandler= (selectedPage) =>{
    console.log(selectedPage)
    if(selectedPage >=1 && selectedPage<= state.totalPages && selectedPage !== state.page)
    setState(state => ({
      ...state, page:selectedPage
    }))
  }
  return (
    <div className="mh200">    <div className='user-input-area'>        
    <input type="text" placeholder='search here...' value={state.searchInput} onChange={onchange} />    
    </div>        
    <div className='grid-container'>               
     {
        /* state.searchInput.length >= 1 ? (
          state.filteredResult.slice(state.page * 10 -10, state.page*10).map((contact) =>{
            return (
                 <div className='grid-item' key={contact.id}>                            
                          <li><b>User Name : </b>{contact.username}</li>                            
                          <li><b>Email: </b>{contact.email}</li>                            
                          <li><b>Blood Group: </b>{contact.bloodGroup}</li>                      
                </div>                      
              )
            })
                  ):(
                    state.jsonData.slice(state.page * 10 -10, state.page*10).map((contact) =>{
                      return (
                        <div className='grid-item' key={contact.id}>                            
                          <li><b>User Name : </b>{contact.username}</li>                            
                          <li><b>Email: </b>{contact.email}</li>                            
                          <li><b>Blood Group: </b>{contact.bloodGroup}</li>                      
                        </div>                      )
                    })
                  ) */
          state.filteredResult.slice(state.page * 10 -10, state.page*10).map((contact) =>{
                    return (
            <div className='grid-item' key={contact.id}>                            
                  <li><b>User Name : </b>{contact.username}</li>                            
                  <li><b>Email: </b>{contact.email}</li>                            
                  <li><b>Blood Group: </b>{contact.bloodGroup}</li>                      
            </div> 
                    )})   
      }
      {
        state.totalPages > 0 && <div className='pagination'>
            <span className={state.page > 1 ? "" : "pagination__disable"} onClick={() => selectedPageHandler(state.page-1)}>Previous</span>
              {[...Array(state.totalPages)].map((_, i) =>{
                  return <span className={state.page === i+1 ? "pagination__selected" : ""} key={i} onClick={() => selectedPageHandler(i+1)} >{i+1}</span>
              })} 
            <span className={state.page < state.totalPages ? "" : "pagination__disable"} onClick={() => selectedPageHandler(state.page+1)}>Next</span>
        </div>
      }
        </div>    </div>  )
}
export default DisplayContacts