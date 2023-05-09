import React, { useEffect, useState } from 'react'
import './DisplayContacts.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../appRedux/contacts/ContactsActions';
import { Link } from 'react-router-dom';
function DisplayContacts(props) {
  const userData = useSelector(state => state.totalContacts)
  const dispatch = useDispatch()
  const [state, setState] = useState({
    jsonData: [],
    filteredResult: [],
    searchInput: "",
    page: 1,
    totalPages: 0,
    pageArray: [],
    genderSelected: [],
    filterSelected: 'all'
  })

  useEffect(() => {
    let urlString = 'http://localhost:3031/users';
    if (state.genderSelected.length > 0 || state.filterSelected !== "all") {
      urlString += "?"
      if (state.genderSelected.length > 0) {
        state.genderSelected.forEach((item) => {
          urlString += 'gender=' + item + '&'
        })
      }
      if (state.filterSelected !== "all") {
        urlString += 'group=' + state.filterSelected + '&'
      }
      urlString = urlString.slice(0, -1);
    }
    console.log(urlString)
    dispatch(fetchContacts(urlString))
    // eslint-disable-next-line 
  }, [state.genderSelected, state.filterSelected])

  useEffect(() => {
    setState(state => ({
      ...state, jsonData: userData
    }))
  }, [userData])

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
    let pageArr = []
    if (state.page <= 4) {
      for (let i = 1; i <= 5; i++) {
        if (i <= state.totalPages) {
          pageArr.push(i)
        }
      }
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
    let count = Math.ceil(state.filteredResult.length / 12)
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
    if (selectedPage >= 1 && selectedPage <= state.totalPages && selectedPage !== state.page)
      setState(state => ({
        ...state, page: selectedPage
      }))
  }

  const handleGenderClick = (gender) => {
    let newArray = state.genderSelected
    if (newArray.includes(gender)) {
      newArray = newArray.filter(item => item !== gender);
    }
    else {
      newArray = [...newArray, gender];
    }
    setState(state => ({
      ...state, genderSelected: newArray
    }))
  }
  const handleGroupChange = (e) => {
    setState(state => ({
      ...state, filterSelected: e.target.value
    }))
  }


  return (
    <div className="min-height">
      <div className='user-input-area'>
        <input type="text" placeholder='search here...' value={state.searchInput} onChange={onchange} />
        <div className='gender-input'>
          <div className={state.genderSelected.includes("male") ? 'gender-male active' : 'gender-male'} onClick={() => { handleGenderClick("male") }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="bi bi-gender-male" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
            </svg>
          </div>
          <div className={state.genderSelected.includes("female") ? 'gender-female active' : 'gender-female'} onClick={() => { handleGenderClick("female") }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="bi bi-gender-female" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z" />
            </svg>
          </div>
        </div>
        <select className="group-input" onChange={(e) => { handleGroupChange(e) }}>
          <option value="all">all</option>
          <option value="friends">friends</option>
          <option value="family">family</option>
          <option value="school">school</option>
          <option value="work">work</option>
          <option value="other">other</option>
        </select>
      </div>
      <div className='grid-container'>
        {
          state.filteredResult.slice(state.page * 12 - 12, state.page * 12).map((contact, i) => {
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
                <div className="innergrid">
                  <p><b>Gender:</b></p>
                  <p>{contact.gender}</p>
                </div>

                <div className='custom-icons'>
                  <Link to={`/update/${contact.contact}`} className='edit-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                  </Link>
                  <div className='del-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                  </div>
                </div>
              </div>
            )
          })
        }

      </div> {state.totalPages > 0 && <div className='pagination'>
        <div className='counters'>
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
        </div>
        <input type="text" placeholder="Go to Page" onChange={(e) => { e.target.value ? selectedPageHandler(parseInt(e.target.value)) : selectedPageHandler(1) }}></input>
      </div>
      }
    </div>
  )
}
export default DisplayContacts