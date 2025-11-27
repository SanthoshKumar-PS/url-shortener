import {decodeShortCode} from '../utils/conversions'
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();
export const getRedirection = async (req:any,res:any) => {
    try {
        const {shorten} = req.params;
        const id = decodeShortCode(shorten);
        const urlShortenedData = await prisma.urlShortener.findUnique({
            where:{id:id}
        })
        
        if (!urlShortenedData) return res.status(404).json({message:"URL not found", redirectdata:urlShortenedData})

        const updatedUrlShortenedData = await prisma.urlShortener.update({
            where:{id:id},
            data:{
                totalClicks:{
                    increment:1
                }
            }
        })
        console.log("Redirection Data: ",urlShortenedData);
        return res.status(200).json({message:"Data fetched successfully", redirectdata:updatedUrlShortenedData})
    } catch (error:any) {
        console.log("Error occured while getting redirection: ",error.message)
        return res.status(500).json({message:"Internal Server Error"})        
    }
}