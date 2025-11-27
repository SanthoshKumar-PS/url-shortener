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
        const {pageNo, limit, search} = req.params;
        const searchParam = search.toLowerCase();
        const totalSkip = (pageNo-1)*limit
        const whereClause:Prisma.UrlShortenerWhereInput ={
            OR:[
                {longUrl : {contains:searchParam}},
                {shortCode : {contains:searchParam}},
            ]
        }
        const results = await prisma.urlShortener.findMany({
            where:whereClause,
            skip:totalSkip,
            take:limit
        });

        console.log("Data retrieved: ",results)
        return res.status(200).json({message:"Fetched Successfully",results:results})

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
        
    } catch (error:any) {
        
    }   
}



