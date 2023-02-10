import { createContext, useState } from "react";

export const UserContext= createContext({
    authSucceed:false,
    setAuthSucceed:()=>{},
    userId:null,
    setUserId:()=>{},
    avatar:null,
    setAvatar:()=>{}
})

export const UserProvider=({children})=>{
    const [authSucceed, setAuthSucceed]= useState(false)
    const [userId, setUserId]= useState(null)
    const [avatar,setAvatar]= useState(null)
    const value={authSucceed, setAuthSucceed, userId,setUserId, avatar, setAvatar}
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}