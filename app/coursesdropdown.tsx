import { updateCourse } from "./courses";
'use client'
import React, { useState, useEffect } from 'react';

function Course({cour,}: {cour : Promise<string[]>;}) {
    //inputValue1 gets the value of the input field, whereas setinputValue1 allows us to change the value of the input field whenever the user types
    const [inputValue1, setinputValue1] = useState('');
    const [options1, setoptions1] = useState<string[]>([]);
    const [courses, setCourses] = useState<string[]>([]);
    const [inputClass, setInputClass] = useState('');
    const [inputValue2, setinputValue2] = useState('');
    const [options2, setoptions2] = useState<string[]>([]);

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
        setoptions1(lookup(inputValue1));
        setoptions2(lookup(inputValue2));
    }, [inputValue1, inputValue2, courses]);
    
    return (
        //When the user types in the input field, this changes its value, which the useEffect above will get all courses to create a dropdown
        <>
            <div>
                <label htmlFor="Exclude" className="block text-sm font-medium leading-6 text-gray-900">Exclude These Courses</label>
                <div className="mt-3">
                    <input type="text" aria-placeholder="Type Course..." id="Exclude" value={inputValue1} onFocus={e => e.target.nextElementSibling?.classList.remove("hidden")} onBlur={e => e.target.nextElementSibling?.classList.add("hidden")} onChange={e => setinputValue1(e.target.value)} className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "+inputClass}></input>
                    <div id="dropdown1" className="overflow-y-auto max-h-52 rounded-md border-2 border-slate-400">
                        {options1.map(option => <a onClick={() => setinputValue1(option)} className="text-gray-700 block rounded-sm px-4 py-2 border-b-2 border-slate-300 hover:bg-slate-300 cursor-pointer text-sm">{option}</a>)}
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="Include" className="block text-sm font-medium leading-6 text-gray-900">Include These Courses</label>
                <div className="mt-3">
                    <input type="text" aria-placeholder="Type Course..." id="Include" value={inputValue2} onFocus={e => e.target.nextElementSibling?.classList.remove("hidden")} onBlur={e => e.target.nextElementSibling?.classList.add("hidden")} onChange={e => setinputValue2(e.target.value)} className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "+inputClass}></input>
                    <div id="dropdown2" className="overflow-y-auto max-h-52 rounded-md border-2 border-slate-400">
                        {options2.map(option => <a onClick={() => setinputValue2(option)} className="text-gray-700 block rounded-sm px-4 py-2 border-b-2 border-slate-300 hover:bg-slate-300 cursor-pointer text-sm">{option}</a>)}
                    </div>
                </div>
            </div>
        </>

        
        
    )
}

export default Course;
