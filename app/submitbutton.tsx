'use client'
 
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation';

export function SubmitButton() {
  const { pending } = useFormStatus()
  const router = useRouter();
  return (
    <button type="submit" className="transition ease-in-out delay-100 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-semibold rounded-md px-3 py-2" aria-disabled={pending}>Submit</button>
  )
}