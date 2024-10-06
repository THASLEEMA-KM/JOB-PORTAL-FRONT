import React, { createContext, useState } from 'react'
export const addjobResponseContext = createContext()
export const editJobResponseContext = createContext()
export const deletePostedJobResponseContext = createContext()
export const saveReponseContext = createContext()
export const applyReponseContext = createContext()
export const deleteAppliedJobResponseContext = createContext()
export const updateJobStatusResponseContext = createContext()
export const updateProfileResponseContext = createContext()

function ContextAPI({children}) {
  const [addJobResponse,setAddJobResponse] = useState("")
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
                    <editJobResponseContext.Provider value={{editJobResponse,setEditJobResponse}}>
                        <updateProfileResponseContext.Provider value={{updateProfileResponse,setUpdateProfileResponse}}>
                          <addjobResponseContext.Provider value={{addJobResponse,setAddJobResponse}}>
                            <deleteAppliedJobResponseContext.Provider value={{deleteAppliedJobResponse,setDeleteAppliedJobResponse}}>
                              {children}
                            </deleteAppliedJobResponseContext.Provider>
                          </addjobResponseContext.Provider>
                        </updateProfileResponseContext.Provider>
                    </editJobResponseContext.Provider>
                  </applyReponseContext.Provider>
              </updateJobStatusResponseContext.Provider>
          </saveReponseContext.Provider>
        </deletePostedJobResponseContext.Provider>
    </>
  )
}

export default ContextAPI