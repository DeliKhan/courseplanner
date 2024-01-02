import { updateCourse } from "./courses";
'use client'
import React, { useState, useEffect } from 'react';

function Course({cour,}: {cour : Promise<string[]>;}) {
    //inputValue gets the value of the input field, whereas setInputValue allows us to change the value of the input field whenever the user types
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [courses, setCourses] = useState<string[]>([]);
    const [inputClass, setInputClass] = useState('');
    useEffect(() => {
        //Right before I call the updateCourse function, I make the user's pointer a wait pointer
        setInputClass('cursor-wait');
        //After the updateCourse function is done, I set the user's pointer to a normal pointer
        cour.then((result) => {setCourses(result);setInputClass('cursor-default')});
    }, []);

    useEffect(() => {
        //Return 40 courses that match the user's input
        const lookup = (input: string) => {
            input = input.toUpperCase();
            return courses.filter(course => course.toUpperCase().includes(input)).slice(0, 40);
        }
        setOptions(lookup(inputValue));
    }, [inputValue, courses]);
    
    return (
        //When the user types in the input field, this changes its value, which the useEffect above will get all courses to create a dropdown
        <>
            <input type="text" aria-placeholder="Type Course..." id="Exclude" value={inputValue} onChange={e => setInputValue(e.target.value)} className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "+inputClass}></input>
            <div id="dropdown" className="overflow-y-auto max-h-52 rounded-md border-2 border-slate-400">
                {options.map(option => <a onClick={() => setInputValue(option)} className="text-gray-700 block rounded-sm px-4 py-2 border-b-2 border-slate-300 hover:bg-slate-300 cursor-pointer text-sm">{option}</a>)}
            </div>
        </>
        
    )
}

export default Course;
