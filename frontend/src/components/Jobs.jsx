import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';  // For the toggle button icon

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [showFilter, setShowFilter] = useState(false);  // State for showing/hiding filter on small screens

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="bg-white dark:bg-[#0f172a] min-h-screen text-gray-900 dark:text-white">
            <Navbar />

            <div className='max-w-7xl mx-auto mt-5 px-4'>
                {/* Toggle FilterCard on small screens */}
                <div className='lg:hidden flex justify-between items-center mb-3'>
                    <Button
                        variant="outline"
                        className='w-full flex items-center justify-center gap-2'
                        onClick={() => setShowFilter(!showFilter)}
                    >
                        {showFilter ? "Hide Filters" : "Show Filters"}
                        {showFilter ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                    </Button>
                </div>

                <div className='flex flex-col lg:flex-row gap-6'>
                    {/* FilterCard for large screens OR conditionally rendered on small screens */}
                    {(showFilter || window.innerWidth >= 1024) && (
                        <div className={`w-full lg:w-[20%] ${showFilter ? '' : 'hidden lg:block'}`}>
                            <FilterCard />
                        </div>
                    )}

                    {
                        filterJobs.length <= 0 ? (
                            <span className="text-gray-700 dark:text-gray-300">Job not found</span>
                        ) : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5 mx-5'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs;
