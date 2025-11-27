import { response } from 'express';
import {generateShortCode, decodeShortCode} from '../utils/conversions'
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createShortUrl = async (req:any,res:any) => {
    try {
        const {longUrl} = req.body;
        const createdData = await prisma.urlShortener.create({
            data:{longUrl:longUrl}
        })
        const shortCode = generateShortCode(createdData.id)
        const updatedData = await prisma.urlShortener.update({
            where:{id:createdData.id},
            data:{shortCode:shortCode}
        })
        console.log("Created Data: ",updatedData);
        return res.status(201).json({message:"Created Successfully", createdData:updatedData})

    } catch (error:any) {
        return res.status(500).json({message:"Internal Server Error", createddata:null})
    }   
}

export const getAllData = async (req:any,res:any) => {  
    try {
        const {pageNo, limit, search} = req.query;
        const page = Number(pageNo)||1
        const pageLimit = Number(limit)||10
        const searchParam = search ? String(search).toLowerCase() : ""
        const totalSkip = (page-1)*pageLimit
        console.log({page:page,limit:pageLimit,search:searchParam})
        const whereClause:Prisma.UrlShortenerWhereInput =(searchParam && searchParam.length>0) ? {
            OR:[
                {longUrl : {contains:searchParam, mode:'insensitive'}},
                {shortCode : {contains:searchParam, mode:'insensitive'}},
            ]
        } : {}
        console.log(whereClause)
        const results = await prisma.urlShortener.findMany({
            where:whereClause,
            skip:totalSkip,
            take:pageLimit,
            orderBy:{
                createdAt:'desc'
            }
        });
        const totalDataCount = await prisma.urlShortener.count({
            where:whereClause
        });


        console.log("Data retrieved: ",results)
        return res.status(200).json({message:"Fetched Successfully",results:results,totalDataCount, totalPages: Math.ceil(totalDataCount/pageLimit) })

    } catch (error:any) {
        console.log("Error occured while fetching data: ",error.message)
        return res.status(500).json({message:"Fetched Successfully",results:null})
    }   
}

export const getStatsData = async (req:any,res:any) => {
    try {
        
    } catch (error:any) {
        
    }   
}

export const deleteData = async (req:any,res:any) => {
    try {
        const {id} = req.query;
        console.log("id to delete: ",id);
        const deletedData = await prisma.urlShortener.delete({
            where:{
                id:Number(id)
            }
        })
        console.log("Deleted successfully")
        return res.status(200).json({message:"Deleted successfully"})
    } catch (error:any) {
        console.log("Error occured while deleting data: ",error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }   
}



