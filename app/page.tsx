import Image from 'next/image'
import Link from 'next/link'
import { lobster, shrik } from './fonts'
import { Program } from './programs'
import Course from './coursesdropdown';
import { updateCourse } from './courses';
import { SubmitButton } from './submitbutton';
import Forms from './forms';

//<h1 className={`${shrik.className} text-6xl subpixel-antialiased bg-gradient-to-r from-orange-400 via-amber-500 to-amber-500 inline-block text-transparent bg-clip-text text-orange-grad drop-shadow-xl`}>Course planner</h1>
//<input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//<input type="submit" value="Submit" className="transition ease-in-out delay-100 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-semibold rounded-md px-3 py-2"></input>
export default function Home() {
  /*async function Forms(formData: FormData) {
    'use server'
    const rawFormData = {
      program: formData.get('programname'),
      excluded: formData.get('selected1'),
      included: formData.get('selected2')
    }
    // Convert rawFormData to a query string
    const queryString = new URLSearchParams(JSON.stringify(rawFormData));
  }*/
  return (
    <main className="bg-indigo-500 flex gap-y-4 min-h-screen flex-col items-center justify-between p-24">
      <h1 className={`${shrik.className} text-center text-6xl subpixel-antialiased bg-gradient-to-r text-amber-500 drop-shadow-xl`}>Course planner</h1>
      <div className="flex lg:w-7/12 flex-col gap-y-5 rounded-lg drop-shadow-xl items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <Forms cour={updateCourse()} list={Program()}/>
      </div>
    </main>
  )
}
/*
<form className="space-y-6" action={Forms} method="POST">
          <div>
            <label htmlFor="programname" className="block text-sm font-medium leading-6 text-gray-900">Program Name</label>
            <div className="mt-3">
              <Program />
            </div>
          </div>
          <Course cour={updateCourse()}/>
          <div className="flex justify-center">
            <SubmitButton/>
          </div>
        </form>
*/