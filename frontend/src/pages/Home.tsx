import { Check, Copy } from 'lucide-react';
import {motion} from 'framer-motion';
import { useState } from 'react';
import UrlShortener from '../components/UrlShortener';

const Home = () => {
  const [shortenUrl, setShortenUrl] = useState<string>("santhsoshURL");
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopy  = async () => {
    await navigator.clipboard.writeText(shortenUrl);
    setCopied(true);
    //TODO:Show Toast or update user
    setTimeout(()=>setCopied(false),1500)
  } 

  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100/30 via-blue-200/70 to-blue-100/50'>
      <div className='flex flex-col justify-center items-center gap-4 md:gap-6 lg:gap-8 px-3'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>
          Shorten Your URLs
        </h1>
        <h1 className='block bg-gradient-to-r from-blue-600  to-blue-300 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>
          Share and use it anywhere
        </h1>
        <p className='text-xl md:text-2xl text-gray-700/80 font-medium text-center max-w-xl mx-4'>
          Transform long, complex URLs into short, memorable links that are easy to share and track
        </p>
        <UrlShortener/>

        <motion.div
          initial={{y:30,opacity:0}}
          animate={{y:0,opacity:1}}
          transition={{duration:1}}
          className='relative w-full p-4 md:p-6 space-y-2 bg-white  border border-gray-200 flex flex-col justify-center items-center rounded-md'
        >
          <p className='text-gray-700/60 text-md md:text-lg'>Your shortened URL:</p>
          <h3 className='text-blue-500 text-lg md:text-xl font-medium'>{shortenUrl}</h3>
          <div
            className='absolute right-10 top-1/2 -translate-y-1/2 rounded-xl bg-gray-200/40 border-2 border-gray-300/60 p-3 hover:bg-blue-500 hover:text-white transition-all duration-300'
            onClick={()=>handleCopy()}
          
          >
            {copied? <Check className='w-5 h-5 '/>:<Copy className='w-5 h-5 '/>}

          </div>

        </motion.div>
      </div>

    </div>
)
}

export default Home