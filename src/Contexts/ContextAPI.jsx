import React, { createContext, useState } from 'react'
export const editJobResponseContext = createContext()
export const deletePostedJobResponseContext = createContext()
export const saveReponseContext = createContext()
export const applyReponseContext = createContext()
export const deleteAppliedJobResponseContext = createContext()
export const updateJobStatusResponseContext = createContext()
export const updateProfileResponseContext = createContext()

function ContextAPI({children}) {
  const [editJobResponse,setEditJobResponse] = useState("")
    const [deletePostedJobResponse,setDeletePostedJobResponse] = useState("")
    const [saveResponse,setSaveResponse] = useState("")
    const [applyResponse,setApplyResponse] = useState("")
    const [deleteAppliedJobResponse,setDeleteAppliedJobResponse] = useState("")
    const [updatejobStatus,setUpdateJobStatus] = useState("")
    const [updateProfileResponse,setUpdateProfileResponse] = useState("")

  return (
    <>
        <deletePostedJobResponseContext.Provider value={{deletePostedJobResponse,setDeletePostedJobResponse}}>
          <saveReponseContext.Provider value={{saveResponse,setSaveResponse}}>
              <updateJobStatusResponseContext.Provider value={{updatejobStatus,setUpdateJobStatus}}>
                <applyReponseContext.Provider value={{applyResponse,setApplyResponse}}>
                  <deleteAppliedJobResponseContext.Provider value={{deleteAppliedJobResponse,setDeleteAppliedJobResponse}}>
                    <editJobResponseContext.Provider value={{editJobResponse,setEditJobResponse}}>
                      <updateProfileResponseContext.Provider value={{updateProfileResponse,setUpdateProfileResponse}}>
                        {children}
                      </updateProfileResponseContext.Provider>
                    </editJobResponseContext.Provider>
                  </deleteAppliedJobResponseContext.Provider >
                </applyReponseContext.Provider>
              </updateJobStatusResponseContext.Provider>
          </saveReponseContext.Provider>
        </deletePostedJobResponseContext.Provider>
    </>
  )
}

export default ContextAPI