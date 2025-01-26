'use client'
import Link from "next/link"

export default function Home() {
    
    return (
        <div>
            <Link href="/finance/dashboard">Dashboard</Link><br></br>
            <Link href="/auth">Login & register</Link><br></br>
            Home page
        </div>
    )
}