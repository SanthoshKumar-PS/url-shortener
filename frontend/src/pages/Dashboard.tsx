import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Pagination from '@/components/Pagination';
import { useDebounce } from '@/components/DebounceSearch';
import axios from 'axios';
import type { UrlShortenerType } from '@/types/TableTypes';
import { div } from 'framer-motion/client';
import { Spinner } from '@/components/Spinner';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import { FolderOpen, Trash2 } from 'lucide-react';

const Dashboard = () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [datas,setDatas] = useState<UrlShortenerType[]>([])

    const [searchParams, setSearchParams] = useState<string>("");
    const debounceValue = useDebounce(searchParams,500);
    const [totalDataCount,setTotaDataCount] = useState<number>(0);
    const [pageNo,setPageNo] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [limit,setLimit] = useState<number>(5);

  const handleGetAllData = async () => {
    try {
        setIsLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/links`,{
            params:{
                pageNo,
                limit,
                search:debounceValue
            }
        });
        console.log("Response recieved: ",response.data)
        setDatas(response.data.results)
        setTotaDataCount(response.data.totalDataCount)
        setTotalPages(response.data.totalPages)
    } catch (error:any) {
        console.log("Error occured while fetching data")
        //TODO: Toast
    } finally{
        setIsLoading(false);
    }
  }

  const handleDeleteData = async (id:number) => {
    try {
        setIsLoading(true)
        const response = await axios.delete(`${BACKEND_URL}/api/links`,{
            params:{
                id
            }
        })
        console.log("Deletion successful");
        handleGetAllData()
    } catch (error:any) {
        console.log("Error occured while deleting a data: ",error.message);
        //TODO: Toast Error
    } finally{
        setIsLoading(false);
    }
  }

  useEffect(()=>{
    handleGetAllData()
  },[pageNo, limit, debounceValue])

  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-blue-100/30 via-blue-200/70 to-blue-100/50 p-4 md:p-6 lg:p-8 '>
        <motion.div 
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='space-y-6'>
            <h2 className='text-center block bg-gradient-to-r from-blue-600  to-blue-300 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>Dashboard</h2>
            <p className='mx-auto text-xl md:text-2xl text-gray-700/80 font-medium text-center max-w-xl mx-4'>
            View and manage all links at one place.
            </p>

            <div className="w-full max-w-3xl flex justify-center mx-auto gap-2 flex flex-col md:flex-row justify-center items-center">
                <motion.div className='w-full relative'>
                    <input
                        type="text"
                        value={searchParams}
                        onChange={(e)=>{
                            setSearchParams(e.target.value);
                            setPageNo(1)
                        }}
                        placeholder="Search..."
                        className="w-full px-4 py-3 rounded-lg shadow bg-white border border-gray-300
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none "
                    />
                </motion.div>

                <motion.button 
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                    onClick={()=>navigate('/')}
                    disabled={isLoading}
                    className="w-full md:w-max whitespace-nowrap bg-gradient-to-r from-blue-500 to-indigo-300/60 text-white font-medium px-4 py-3 rounded-md disabled:cursor-not-allowed">
                    Shorten URL
                </motion.button>
            </div>



            {isLoading?(
                <div className='mx-auto flex justify-center items-center bg-white max-w-3xl min-h-70 rounded-lg shadow bg-white'>
                    <Spinner/>
                </div>
            ):(
            <motion.div
                className="w-full flex justify-center ">
                <div className="w-full max-w-3xl overflow-x-auto rounded-lg shadow bg-white">
                    <Table className="min-w-full ">
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead className="w-[140px] text-sm font-semibold text-gray-700">
                                Shortened URL
                            </TableHead>

                            <TableHead className="text-sm font-semibold text-gray-700">
                                Long URL
                            </TableHead>

                            <TableHead className="text-sm font-semibold text-gray-700 text-center">
                                Total Clicks
                            </TableHead>

                            <TableHead className="text-sm font-semibold text-gray-700 text-center">
                                Last Used At
                            </TableHead>
                            <TableHead className="text-sm font-semibold text-gray-700 text-center">
                                View
                            </TableHead>
                            <TableHead className="text-sm font-semibold text-gray-700 text-center">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody >
                        {datas.map((data,index)=>(
                            <TableRow key={data.id} className="hover:bg-gray-100 transition"
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    navigate(`/code/${data.shortCode}`)
                                }}
                            >
                                <TableCell className="font-medium text-blue-600">
                                    {data.shortCode}
                                </TableCell>

                                <TableCell className="max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">
                                    {data.longUrl}
                                </TableCell>

                                <TableCell className="text-center font-semibold">
                                    {data.totalClicks}
                                </TableCell>

                                <TableCell className="text-center text-gray-600">
                                    {new Date(data.createdAt).toLocaleDateString('en-IN')}
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex justify-center">
                                        <span className="p-2 text-blue-400 hover:text-blue-600">
                                            <FolderOpen className="w-4 h-4" />
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell className="text-center">
                                    <div className="flex justify-center">
                                        <span 
                                            className="p-2 text-red-400 hover:text-red-600"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteData(data.id);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>

                </div>
            </motion.div>
            )}

            {/* Pagination and Rows Count */}
            <div className="mx-auto flex flex-col max-w-3xl md:flex-row items-center md:justify-between gap-4 md:items-center md:px-10">

            {/* Page Numbers */}
            <div className="w-full md:w-auto flex justify-center md:justify-start">
                <Pagination
                currentPage={pageNo}
                    totalPages={totalPages}
                    onChange={(p) => setPageNo(p)}
                />
            </div>

            {/* No Of Rows */}
            <div className="w-full md:w-auto flex justify-center items-center md:justify-end gap-3">
                <span className="font-medium text-gray-700">Results: {Math.min((pageNo-1)*limit+1,totalDataCount)} - {Math.min(totalDataCount,pageNo*limit)} of {totalDataCount}</span>
                <select
                    className="border border-gray-300 rounded-md shadow-md px-1 py-1 bg-white"
                    value={limit}
                    onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPageNo(1)
                    }}
                >
                    {[2, 5, 10, 20, 30, 100].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                    {pageSize}
                    </option>
                    ))}
                </select>
            </div>
            </div>
        </motion.div>
    </div>
  )
}

export default Dashboard