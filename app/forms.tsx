'use client'
import { useRouter } from 'next/navigation'
import { Program } from './programs'
import Course from './coursesdropdown';
import { SubmitButton } from './submitbutton';
import React, { useState, useEffect } from 'react';

interface Program {
    hrefLink: string;
    programName: string;
}

export default function Forms({cour,list}: {cour : Promise<string[]>;list : Promise<Program[]>;}) {
    const [programs, setPrograms] = useState<Program[]>([]);
    useEffect(() => {
        const fetchList = async () => {
          const result = await list;
          setPrograms(result);
        };
    
        fetchList();
    }, [list]);
    const router = useRouter();
    async function FormAct(formData: FormData) {
        const rawFormData = {
          program: formData.get('programname'),
          excluded: formData.get('selected1'),
          included: formData.get('selected2')
        }
        // Convert rawFormData to a query string
        const queryString = new URLSearchParams(JSON.stringify(rawFormData));
        
        router.push(`/results?${queryString}`);
    }
    return (
        <form className="space-y-6" action={FormAct} method="POST">
            <div>
                <label htmlFor="programname" className="block text-sm font-medium leading-6 text-gray-900">Program Name</label>
                <div className="mt-3">
                    <select id="programname" name="programname" className="flex-1 w-full justify-start py-2 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {programs.map(program => <option value={program.hrefLink}>{program.programName}</option>)}
                    </select>
                </div>
            </div>
            <Course cour={cour}/>
            <div className="flex justify-center">
                <SubmitButton/>
            </div>
        </form>
    )
    // ...
}