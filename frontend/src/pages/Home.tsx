import { ArrowUpRight, Check, Copy, Layers2 } from 'lucide-react';
import {motion} from 'framer-motion';
import { useState } from 'react';
import UrlShortener from '../components/UrlShortener';
import { Spinner } from '@/components/Spinner';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [longUrl, setLongUrl] = useState<string>("")
  const [shortenUrl, setShortenUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleCopy  = async () => {
    await navigator.clipboard.writeText(shortenUrl!);
    setCopied(true);
    //TODO:Show Toast or update user
    setTimeout(()=>setCopied(false),1500)
  } 



  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100/30 via-blue-200/70 to-blue-100/50'>
      <motion.div 
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className='flex flex-col justify-center items-center gap-4 md:gap-6 lg:gap-8 px-3'>
        <motion.div
          onClick={()=>{
            navigate('/dashboard')
          }}
          whileHover={{scale:1.05}}
          whileTap={{scale:0.95}}
            className='px-3 py-2 rounded-lg text-white text-xl md:text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-br from-blue-600 to-blue-300 '>
          Go To Dashboard
        </motion.div>

        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>
          Shorten Your URLs
        </h1>
        <h1 className='block bg-gradient-to-r from-blue-600  to-blue-300 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>
          Share and use it anywhere
        </h1>
        <p className='text-xl md:text-2xl text-gray-700/80 font-medium text-center max-w-xl mx-4'>
          Transform long, complex URLs into short, memorable links that are easy to share and track
        </p>
        <UrlShortener shortenUrl={shortenUrl} setShortenUrl={setShortenUrl} isLoading={isLoading} setIsLoading={setIsLoading} />

        <motion.div
          className='relative w-full p-4 md:p-6 space-y-2 bg-white  border border-gray-200 flex justify-center items-center rounded-md'
        >
          {isLoading?(
            <Spinner/>
          ):shortenUrl?(
            <div className='flex flex-col justify-center items-center'>
              <p className='text-gray-700/60 text-md md:text-lg'>Your shortened URL:</p>
              <motion.h3
            initial={{scale:0}}
            animate={{scale:1}} 
              className='text-blue-500 text-lg md:text-xl font-medium'>{shortenUrl}</motion.h3>
              <div
                className='absolute right-10 top-1/2 -translate-y-1/2 rounded-xl bg-gray-200/40 border-2 border-gray-300/60 p-3 hover:bg-blue-500 hover:text-white transition-all duration-300'
                onClick={()=>handleCopy()}
              
              >
                {copied? <Check className='w-5 h-5 '/>:<Copy className='w-5 h-5 '/>}

              </div>
            </div>
          ):(
            <div className='text-gray-700/60 text-md md:text-lg flex justify-center items-center gap-2'>
              <Layers2 className='w-5 h-5' />
              <p>Your shortened link will appear here</p>
            </div>
          )}
        </motion.div>
      </motion.div>

    </div>
)
}

export default Home