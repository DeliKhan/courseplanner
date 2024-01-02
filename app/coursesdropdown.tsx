'use client'
import { updateCourse } from "./courses";
import { useState, useEffect } from 'react';

export async function Course() {
    //inputValue gets the value of the input field, whereas setInputValue allows us to change the value of the input field whenever the user types
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const courses = await updateCourse();

    useEffect(() => {
        setOptions(lookup(courses, inputValue));
    }, [inputValue, courses]);
    return (
        <div className="dropdown">
            <input type="text" aria-placeholder="Type Course..." id="Exclude" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyUp={() => lookup(courses, inputValue)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
            {options.map(option => <option value={option}>{option}</option>)}
        </div>
    )
}

export function lookup(courses: string[], input: string) {
    input = input.toUpperCase();
    return (
        //gets only the top 5 search results 
        courses.filter(course => course.toUpperCase().includes(input)).slice(0, 5)
    )
}