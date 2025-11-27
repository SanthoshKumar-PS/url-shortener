import { Link2, X } from "lucide-react"
import {motion, scale} from 'framer-motion'
import { useState, type Dispatch, type SetStateAction } from "react"
import axios from "axios"
type UrlShortenerProps = {
    shortenUrl:string | null,
    setShortenUrl:Dispatch<SetStateAction<string|null>>, 
    isLoading:boolean, 
    setIsLoading:Dispatch<SetStateAction<boolean>>
}
const UrlShortener = ({shortenUrl, setShortenUrl, isLoading, setIsLoading}:UrlShortenerProps) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [longUrl, setLongUrl] = useState<string>("")
    const handleCreateLongUrl = async () =>{
        try {
            setIsLoading(true)
            const response = await axios.post(`${BACKEND_URL}/api/links`,{
                longUrl: longUrl
            })
            console.log(response.data)
            setShortenUrl(response.data.createdData.shortCode)
        } catch (error:any) {
            console.log("Error occured while creating shortened URL: ",error.message);
            //TODO: Toast Error
        } finally{
            setIsLoading(false)
        }
    }
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mx-4 w-full">
        <div className="w-full md:flex-grow relative">
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
                <Link2 className="w-4 h-4 text-gray-700/70"/>
            </div>
            <input type="text" value={longUrl} onChange={(e)=>setLongUrl(e.target.value)} 
            onKeyDown={(e)=>{
                if(e.key === 'Enter' && longUrl.trim()){
                    handleCreateLongUrl()
                }
            }}
            className="w-full px-8 bg-white px-4 py-3 rounded-md border border-gray-300 ring-2 ring-gray-300/40 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 outline-none" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2" onClick={()=>setLongUrl("")}>
                <X className="w-4 h-4 text-gray-700/70"/>
            </div>
        </div>
        <motion.button 
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            onClick={()=>handleCreateLongUrl()}
            disabled={isLoading || longUrl.length===0}
            className="w-full md:w-max whitespace-nowrap bg-gradient-to-r from-blue-500 to-indigo-300/60 text-white font-medium px-4 py-3 rounded-md disabled:cursor-not-allowed">
            Shorten URL
        </motion.button>

    </div>
  )
}

export default UrlShortener