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
const Dashboard = () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data,setData] = useState<UrlShortenerType[]>([])

    const [searchParams, setSearchParams] = useState<string>("");
    const debounceValue = useDebounce(searchParams,500);
    const [totalOrdersCount,setTotalOrdersCount] = useState<number>(0);
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
    } catch (error:any) {
        console.log("Error occured while fetching data")
        //TODO: Toast
    } finally{
        setIsLoading(false);
    }
  }

  useEffect(()=>{

  },[pageNo, limit, ])

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-blue-100/30 via-blue-200/70 to-blue-100/50 p-4 md:p-6 lg:p-8 space-y-6'>
        <h2 className='text-center block bg-gradient-to-r from-blue-600  to-blue-300 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>Dashboard</h2>
        <p className='mx-auto text-xl md:text-2xl text-gray-700/80 font-medium text-center max-w-xl mx-4'>
          View and manage all links at one place.
        </p>

        <div className="w-full flex justify-center">
            <input
                type="text"
                placeholder="Enter long URL..."
                className="w-full max-w-3xl px-4 py-3 rounded-lg shadow bg-white border border-gray-300
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none "
            />
        </div>




    <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-3xl overflow-x-auto rounded-lg shadow bg-white">
            <Table className="min-w-full">
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
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow className="hover:bg-gray-50 transition">
                <TableCell className="font-medium text-blue-600">
                    abcdef
                </TableCell>

                <TableCell className="max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">
                    https://www.google.com/search?q=chatgpt+url+shortener+example
                </TableCell>

                <TableCell className="text-center font-semibold">
                    25
                </TableCell>

                <TableCell className="text-center text-gray-600">
                    15 Jan 2025
                </TableCell>
                </TableRow>
            </TableBody>
            </Table>

        </div>
    </div>

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
            <span className="font-medium">Results: {Math.min((pageNo-1)*limit+1,totalOrdersCount)} - {Math.min(totalOrdersCount,pageNo*limit)} of {totalOrdersCount}</span>
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

        
    </div>
  )
}

export default Dashboard