import { createContext, useState,useCallback } from "react";
import {useNavigate} from "react-router-dom";

export const UserContext= createContext({
    authSucceed:false,
    setAuthSucceed:()=>{},
    userId:null,
    setUserId:()=>{},
    avatar:null,
    setAvatar:()=>{},
    token:null,
    setToken:()=>{},
    login:()=>{},
    logout:()=>{},
    tokenExpirationDate:null,
})

export const UserProvider=({children})=>{
    const [userId, setUserId]= useState(null)
    const [avatar,setAvatar]= useState(null)
    const [token,setToken]=useState(null)
    const [tokenExpirationDate, setTokenExpirationDate]=useState(null)

    const navigate= useNavigate()
    const login= useCallback((uid, token,avatar, expirationDate)=>{
        setToken(token)
        setUserId(uid)
        setAvatar(avatar)
        const date= expirationDate|| new Date(new Date().getTime()+ 1000*60*2)
        setTokenExpirationDate(date)
        localStorage.setItem(
            'userData',
            JSON.stringify({userId:uid, token:token,avatar:avatar, expiration:date.toISOString()})
        )
    },[])

    const logout=useCallback(()=>{
        setToken(null)
        setUserId(null)
        setAvatar(null)
        setTokenExpirationDate(null)
        localStorage.removeItem('userData')
        navigate('/')
    },[])

    const value={userId,setUserId, avatar, setAvatar,token,setToken,login,logout,tokenExpirationDate}
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}