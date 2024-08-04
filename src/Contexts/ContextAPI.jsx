import React, { createContext, useState } from 'react'
export const saveReponseContext = createContext()
function ContextAPI({children}) {
    const [saveResponse,setSaveResponse] = useState("")

  return (
    <>
        <saveReponseContext.Provider value={{saveResponse,setSaveResponse}}>
            {children}
        </saveReponseContext.Provider>
    </>
  )
}

export default ContextAPI