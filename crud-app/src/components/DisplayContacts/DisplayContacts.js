import React, { useEffect, useState } from 'react'
import './DisplayContacts.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../appRedux/contacts/ContactsActions';
function DisplayContacts(props) {
  const userData = useSelector(state => state.totalContacts)
  const appState = useSelector(state => state)
  const dispatch = useDispatch()
  const [state, setState] = useState({
    jsonData: [],
    filteredResult: [],
    searchInput: "",
    page: 1,
    totalPages: 0,
    pageArray: []
  })

  useEffect(() => {
    dispatch(fetchContacts('http://localhost:3031/users'))
    console.log(appState)
  }, [])
  useEffect(() => {
    let somedata = [];
    if (state.searchInput !== '') {
      const filteredData = state.jsonData.filter((contact) => {
        return contact.username.toLowerCase().includes(state.searchInput.toLowerCase())
      })
      somedata = filteredData;
    }
    else {
      somedata = state.jsonData
    }
    setState(state => ({
      ...state, filteredResult: somedata
    }))

  }, [state.searchInput, state.jsonData]);

  useEffect(() => {
    // const getContactsData = async () => {
    //   const data = await fetch("https://dummyjson.com/users?limit=100");
    //   const data1 = await data.json();
    //   const json = data1.users;
    //   setState(state => ({
    //     ...state, jsonData: json
    //   }))
    // }
    // getContactsData();

    setState(state => ({
      ...state, jsonData: userData
    }))
  }, [userData])

  useEffect(() => {
    let pageArr = []

    if (state.page <= 4) {
      pageArr = [1, 2, 3, 4, 5]
    }
    else if (state.page >= (state.totalPages - 3)) {
      pageArr = [state.totalPages - 4, state.totalPages - 3, state.totalPages - 2, state.totalPages - 1, state.totalPages]
    }
    else {
      pageArr = [state.page - 2, state.page - 1, state.page, state.page + 1, state.page + 2,]
    }
    setState(state => ({
      ...state, pageArray: pageArr
    }))
  }, [state.page, state.totalPages])
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
  return (
    <div className="mh200">    <div className='user-input-area'>
      <input type="text" placeholder='search here...' value={state.searchInput} onChange={onchange} />
    </div>
      <div className='grid-container'>
        {
          state.filteredResult.slice(state.page * 10 - 10, state.page * 10).map((contact, i) => {
            return (
              <div className='grid-item' key={i}>
                <div className="innergrid">
                  <p><b>User Name:</b></p>
                  <p>{contact.username}</p>
                </div>
                <div className="innergrid">
                  <p><b>Email:</b></p>
                  <p>{contact.email}</p>
                </div>
                <div className="innergrid">
                  <p><b>DOB:</b></p>
                  <p>{contact.DOB}</p>
                </div>
                <div className="innergrid">
                  <p><b>Number:</b></p>
                  <p>{contact.contact}</p>
                </div>
              </div>
            )
          })
        }

      </div> {state.totalPages > 0 && <div className='pagination'>
        <span className={state.page > 1 ? "" : "pagination__disable"} onClick={() => selectedPageHandler(state.page - 1)}>Previous</span>
        {
          state.page <= 4 ? <></> : <><span className={state.page === 1 ? "pagination__selected" : ""} onClick={() => selectedPageHandler(1)} >{1}</span><span>...</span></>
        }
        {state.pageArray.map((p, i) => {
          return <span className={state.page === p ? "pagination__selected" : ""} key={i} onClick={() => selectedPageHandler(p)} >{p}</span>
        })}
        {
          state.page >= (state.totalPages - 3) ? <></> : <><span>...</span><span className={state.page === state.totalPages ? "pagination__selected" : ""} onClick={() => selectedPageHandler(state.totalPages)} >{state.totalPages}</span></>
        }
        <span className={state.page < state.totalPages ? "" : "pagination__disable"} onClick={() => selectedPageHandler(state.page + 1)}>Next</span>
        <input type="text" onChange={(e) => { e.target.value ? selectedPageHandler(parseInt(e.target.value)) : selectedPageHandler(1) }}></input>
      </div>
      }   </div>)
}
export default DisplayContacts