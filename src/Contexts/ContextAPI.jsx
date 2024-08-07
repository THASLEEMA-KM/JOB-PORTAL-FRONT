import React, { createContext, useState } from 'react'
export const saveReponseContext = createContext()
export const applyReponseContext = createContext()

function ContextAPI({children}) {
    const [saveResponse,setSaveResponse] = useState("")
    const [applyResponse,setApplyResponse] = useState("")
  return (
    <>
        <saveReponseContext.Provider value={{saveResponse,setSaveResponse}}>
            <applyReponseContext.Provider value={{applyResponse,setApplyResponse}}>
              {children}
            </applyReponseContext.Provider>
        </saveReponseContext.Provider>
    </>
  )
}

export default ContextAPI