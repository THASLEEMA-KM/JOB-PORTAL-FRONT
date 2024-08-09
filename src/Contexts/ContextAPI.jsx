import React, { createContext, useState } from 'react'
export const deletePostedJobResponseContext = createContext()
export const saveReponseContext = createContext()
export const applyReponseContext = createContext()
export const deleteAppliedJobResponseContext = createContext()

function ContextAPI({children}) {
    const [deletePostedJobResponse,setDeletePostedJobResponse] = useState("")
    const [saveResponse,setSaveResponse] = useState("")
    const [applyResponse,setApplyResponse] = useState("")
    const [deleteAppliedJobResponse,setDeleteAppliedJobResponse] = useState("")

  return (
    <>
        <deletePostedJobResponseContext.Provider value={{deletePostedJobResponse,setDeletePostedJobResponse}}>
          <saveReponseContext.Provider value={{saveResponse,setSaveResponse}}>
              <applyReponseContext.Provider value={{applyResponse,setApplyResponse}}>
                <deleteAppliedJobResponseContext.Provider value={{deleteAppliedJobResponse,setDeleteAppliedJobResponse}}>
                  {children}
                </deleteAppliedJobResponseContext.Provider >
              </applyReponseContext.Provider>
          </saveReponseContext.Provider>
        </deletePostedJobResponseContext.Provider>
    </>
  )
}

export default ContextAPI