import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
type StatusCode = '200' | '404' | '500';
const RedirectPage = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const {shorten} = useParams<{shorten:string}>()
  const [status, setStatus] = useState<StatusCode|null>(null)
  const statusMap :Record<StatusCode,string> = {
    '200':'Redirecting Page. . .',
    '404':'Shortened URL not present ',
    '500':'Internal Server Error ',
  }
  const handleRedirectingPage = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/${shorten}`)
      console.log("Redirect Response: ",response.data)
      if(response.status===200){
        setStatus('200')
        window.location.href = response.data.redirectdata.longUrl;
      }
      console.log("Redirect Response: ", response.data)
    } catch (error:any) {
      console.log("Error occured while redirectly the page: ",error.message);
      //TODO: Toast Error
      if(error.response){
        if(error.response.status===404){
          setStatus('404')
          console.log("Shortened URL not found in database")
          //TODO: Toast Error
        } else if(error.response.status===500){
          setStatus('500')
          console.log("Internal Server Error");
          //TODO: Toast Error
        } else{
          setStatus('500')
          console.log("Unexpected error")
          //TODO: Toast Error
        }
      }
    }
  }
  useEffect(()=>{
    handleRedirectingPage();

  },[])
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100/30 via-blue-200/70 to-blue-100/50 flex justify-center items-center font-medium text-lg md:text-xl lg:text-2xl text-blue-500'>
      {status && statusMap[status]}
    </div>
  )
}

export default RedirectPage