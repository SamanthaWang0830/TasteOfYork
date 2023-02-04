import { useState,useCallback, useRef , useEffect} from "react"

const useHttpClient=()=>{
    const [isLoading, setIsLoading]=useState(false)
    const [loadingError, setLoadingError]=useState()

    const activeHttpRequests= useRef([])

    const sendRequest=useCallback(async(url, method='GET', body=null, headers={})=>{
        setIsLoading(true)
        const httpAbortController= new AbortController()
        activeHttpRequests.current.push(httpAbortController)
        try {
            const response=await fetch(url,{
                method,
                body,
                headers,
                signal:httpAbortController.signal
            })
            const responseData= await response.json()
            if(!response.ok){
                throw new Error(responseData.message)
            }
            setIsLoading(false)
            return responseData
        } catch (err) {
            setLoadingError(err.message || 'Something went wrong, please try it again')
            setIsLoading(false)
            throw err
        }
    },[])

    //a cleanup function
    useEffect(()=>{
        return ()=>{
            activeHttpRequests.current.forEach(abortController=>abortController.abort())
        }
    },[])
    return {isLoading,loadingError,sendRequest}
}
export default useHttpClient