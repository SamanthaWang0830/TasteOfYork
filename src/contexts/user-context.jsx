import { createContext, useState } from "react";

export const UserContext= createContext({
    authSucceed:false,
    setAuthSucceed:()=>{}
})

export const UserProvider=({children})=>{
    const [authSucceed, setAuthSucceed]= useState(false)
    const value={authSucceed, setAuthSucceed}
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}