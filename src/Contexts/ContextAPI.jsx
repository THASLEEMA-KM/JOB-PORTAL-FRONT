import React, { createContext, useState } from 'react'
export const applyReponseContext = createContext()
function ContextAPI({children}) {
    const [applyResponse,setApplyResponse] = useState("")

  return (
    <>
        <applyReponseContext.Provider value={{applyResponse,setApplyResponse}}>
            {children}
        </applyReponseContext.Provider>
    </>
  )
}

export default ContextAPI