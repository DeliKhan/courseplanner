'use client'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import courses from '../../data/courses.json'

export default function Home() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    useEffect(() => {
        const paramsObject = JSON.parse(Object.keys(Object.fromEntries(searchParams.entries())));
        console.log(paramsObject.included)
        // You can now use the current URL
        // ...
    }, [searchParams])
    return <p>{JSON.stringify(Object.fromEntries(searchParams))}</p>
}