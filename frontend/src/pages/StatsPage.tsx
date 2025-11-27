import { Spinner } from '@/components/Spinner';
import {type UrlShortenerType } from '@/types/TableTypes';
import axios from 'axios';
import { div } from 'framer-motion/client';
import { Link, LinkIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {motion} from 'framer-motion'
const StatsPage = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const {shorten} = useParams<{shorten:string}>();
  const [data, setData] = useState<UrlShortenerType|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate()


  const getDataByShorten = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${BACKEND_URL}/api/links/${shorten}`)
      console.log("Response recieved: ",response.data)
      setData(response.data.urlDetails)
    } catch (error:any) {
      console.log("Error occured while fetcing data: ",error.message)
      //TODO: Toast Error
    } finally{
      setIsLoading(false)
    }

  } 
  useEffect(()=>{
    getDataByShorten();
  },[])

  if(isLoading || !data){
    return (
      <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100/30 via-blue-200/70 to-blue-100/50 p-4'>
         {isLoading ? <Spinner /> : <p className="text-gray-600 text-xl font-medium">No Data Found</p>}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100/30 via-blue-200/70 to-blue-100/50 p-4">
      <div className="container mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Link Details
        </h1>

        <div className="bg-white/70 border border-gray-200 rounded-2xl shadow-lg p-6 space-y-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3">
            <LinkIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-lg md:text-xl font-semibold text-gray-700">Short Code</h2>
          </div>
          <p className="mt-1 text-lg md:text-xl font-mono font-semibold text-blue-600">{data.shortCode}</p>

          <div>
            <h2 className="text-md lg:text-lg font-medium text-gray-500">Original URL</h2>
            <p className="text-xl mt-1 font-medium text-blue-500 transition-colors duration-200">
              {data.longUrl}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Link ID</h2>
              <p className="mt-1 text-gray-800 font-semibold">#{data.id}</p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">Total Clicks</h2>
              <p className="mt-1 text-gray-800 font-semibold">{data.totalClicks}</p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">Created At</h2>
              <p className="mt-1 text-gray-800">{new Date(data.createdAt).toLocaleString()}</p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">Last Accessed At</h2>
              <p className="mt-1 text-gray-800">{new Date(data.lastClickedAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-200 font-medium"
              onClick={()=>getDataByShorten()}
            >
              Refresh Data
            </button>
          </div>
        </div>

        <div className='w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4'>
        <motion.div
          onClick={()=>{
            navigate('/dashboard')
          }}
          whileHover={{scale:1.05}}
          whileTap={{scale:0.95}}
            className='px-3 py-2 rounded-lg text-white text-md md:text-lg lg:text-xl font-bold tracking-tight bg-gradient-to-br from-blue-600 to-blue-300 flex-1 text-center'>
          Go To Dashboard
        </motion.div>
        <motion.div
          onClick={()=>{
            navigate('/')
          }}
          whileHover={{scale:1.05}}
          whileTap={{scale:0.95}}
            className='px-3 py-2 rounded-lg text-white text-md md:text-lg lg:text-xl font-bold tracking-tight bg-gradient-to-br from-blue-600 to-blue-300 flex-1 text-center'>
          Create Shorten Url
        </motion.div>

        </div>
      </div>
    </div>
  );
};


export default StatsPage