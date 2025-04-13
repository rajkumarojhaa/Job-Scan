import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    

    return (
        <div className='text-center  dark:text-white'>
            <div className='flex flex-col gap-5 my-10'>
                
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
                <div className='flex sm:w-[40%] w-72 shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pl-3 rounded-full items-center gap-4 mx-auto transition-colors duration-300'>
    <input
        type="text"
        placeholder='Find your dream jobs'
        onChange={(e) => setQuery(e.target.value)}
        className='outline-none border-none w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
    />
    <Button 
        onClick={searchJobHandler} 
        className="rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white"
    >
        <Search className='h-5 w-5' />
    </Button>
</div>

            </div>
        </div>
    )
}

export default HeroSection