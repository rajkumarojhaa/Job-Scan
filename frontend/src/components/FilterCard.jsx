import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useLocation } from 'react-router-dom';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    // Dispatch filter value when selected
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    // Auto-clear filters on route change
    useEffect(() => {
        setSelectedValue('');
        dispatch(setSearchedQuery(''));
    }, [location.pathname, dispatch]);

    // Manual clear handler
    const clearFilters = () => {
        setSelectedValue('');
        dispatch(setSearchedQuery(''));
    };

    return (
        <div className='sm:w-full w-16 bg-white dark:bg-[#0f172a] text-gray-900 dark:text-white p-3 rounded-md'>
            <h1 className='font-bold sm:text-lg text-md'>Filter Jobs</h1>
            <hr className='mt-4' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h1 className='font-bold sm:text-lg text-md mt-4'>{data.filterType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div key={itemId} className='flex items-center sm:space-x-2 space-x-1 my-2'>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>

            {/* Clear Filters Button */}
            <button
                onClick={clearFilters}
                className='mt-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400'
            >
                Clear Filters
            </button>
        </div>
    );
};

export default FilterCard;
