'use client'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
export default function Home() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
 
    useEffect(() => {
        const paramsObject = Object.fromEntries(searchParams);
        console.log(paramsObject);
        // You can now use the current URL
        // ...
    }, [searchParams])
    return <p>{JSON.stringify(Object.fromEntries(searchParams))}</p>
}