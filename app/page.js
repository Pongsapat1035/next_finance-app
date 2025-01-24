import Link
    from "next/link"
export default function Home() {
    return (
        <div>
            <Link href="/dashboard">Dashboard</Link><br></br>
            <Link href="/authen">Login & register</Link><br></br>
            home
        </div>
    )
}