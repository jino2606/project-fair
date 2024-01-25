import React, {createContext, useState } from 'react'

/* to create context api we use - createContext() */
export const addProjectResponseContext = createContext()

/*  */
export const isAuthTokenContext = createContext()

function ContextShare({children}){
    /* chindren is a predefinedprops used to share data between all components */

    /* create data that need to be shared */
    const [addProjectResponse, setAddProjectResponse] = useState({})

    /*  */
    const [isAuthToken, setIsAuthToken] = useState(true)

  return (
    <>
      <addProjectResponseContext.Provider value={{addProjectResponse, setAddProjectResponse}}>
        <isAuthTokenContext.Provider value={{isAuthToken, setIsAuthToken}}>
          {children}
        </isAuthTokenContext.Provider>
       </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare
