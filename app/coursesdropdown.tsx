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
    const [dropdownVisible1, setDropdownVisible1] = useState(false);
    const [dropdownVisible2, setDropdownVisible2] = useState(false);
    const [selected1, setSelected1] = useState<string[]>([]);
    const [selected2, setSelected2] = useState<string[]>([]);

    useEffect(() => {
        //Right before I call the updateCourse function, I make the user's pointer a wait pointer
        setInputClass('cursor-wait');
        //After the updateCourse function is done, I set the user's pointer to a normal pointer
        cour.then((result) => {setCourses(result);setInputClass('cursor-default')});
    }, []);

    useEffect(() => {
        //Return 40 courses that match the user's input
        const lookup = (input: string) => {
            return courses.filter(course => (new RegExp('(' + input.split(' ').join('|') + ')', 'gi')).test(course)).slice(0, 40);
            //input = input.toUpperCase();
            //return courses.filter(course => course.toUpperCase().includes(input)).slice(0, 40);
        }
        setoptions1(lookup(inputValue1));
        setoptions2(lookup(inputValue2));
    }, [inputValue1, inputValue2, courses]);
    
    return (
        //When the user types in the input field, this changes its value, which the useEffect above will get all courses to create a dropdown
        //The point of onMouseDown is to prevent the input field from losing focus when the user clicks on the dropdown
        //onFocus={e => e.target.nextElementSibling?.classList.remove("hidden")} onBlur={e => e.target.nextElementSibling?.classList.add("hidden")}
        <>
            <input type="hidden" name="selected1" value={JSON.stringify(selected1)} />
            <input type="hidden" name="selected2" value={JSON.stringify(selected2)} />
            <div>
                <label htmlFor="Exclude" className="block text-sm font-medium leading-6 text-gray-900">Exclude These Courses</label>
                <div className="mt-3">
                    <input type="text" aria-placeholder="Type Course..." id="Exclude" value={inputValue1} onFocus={() => setDropdownVisible1(true)} onBlur={() => setDropdownVisible1(false)} onChange={e => setinputValue1(e.target.value)} className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "+inputClass}></input>
                    <div id="dropdown1" className={`overflow-y-auto max-h-52 rounded-md border-2 border-slate-400 ${dropdownVisible1 ? '' : 'hidden'}`}>
                        {options1.map(option => <a onMouseDown={e => e.preventDefault()} onClick={() => {setinputValue1(""); setDropdownVisible1(true);setSelected1(prevOptions => prevOptions.includes(option) ? prevOptions : [...prevOptions, option]);}} className="text-gray-700 block rounded-sm px-4 py-2 border-b-2 border-slate-300 hover:bg-slate-300 cursor-pointer text-sm">{option}</a>)}
                    </div>
                    <div className="flex flex-wrap gap-y-2 gap-x-1 pt-2">
                        {selected1.map((option : string) => 
                            <div className="flex grow-0 w-fit content-center gap-2 bg-amber-500 font-semibold rounded-md px-3 py-2">
                                {option.split(" ").slice(0,2).join(" ") + "..."}
                                <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => setSelected1(prevOptions => prevOptions.filter(prevOption => prevOption !== option))} className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Close menu</span>
                                    <svg className="h-2.5 w-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="Include" className="block text-sm font-medium leading-6 text-gray-900">Include These Courses</label>
                <div className="mt-3">
                    <input type="text" aria-placeholder="Type Course..." id="Include" value={inputValue2} onFocus={() => setDropdownVisible2(true)} onBlur={() => setDropdownVisible2(false)} onChange={e => setinputValue2(e.target.value)} className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "+inputClass}></input>
                    <div id="dropdown2" className={`overflow-y-auto max-h-52 rounded-md border-2 border-slate-400 ${dropdownVisible2 ? '' : 'hidden'}`}>
                        {options2.map(option => <a onMouseDown={e => e.preventDefault()} onClick={() => {setinputValue2("");setDropdownVisible2(true);setSelected2(prevOptions2 => prevOptions2.includes(option) ? prevOptions2 : [...prevOptions2, option]);}} className="text-gray-700 block rounded-sm px-4 py-2 border-b-2 border-slate-300 hover:bg-slate-300 cursor-pointer text-sm">{option}</a>)}
                    </div>
                    <div className="flex flex-wrap gap-y-2 gap-x-1 pt-2">
                        {selected2.map((option : string) => 
                            <div className="flex grow-0 w-fit content-center gap-2 bg-amber-500 font-semibold rounded-md px-3 py-2">
                                {option.split(" ").slice(0,2).join(" ") + "..."}
                                <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => setSelected2(prevOptions2 => prevOptions2.filter(prevOption2 => prevOption2 !== option))} className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Close menu</span>
                                    <svg className="h-2.5 w-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>

        
        
    )
}

export default Course;
