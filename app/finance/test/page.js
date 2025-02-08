import { headers } from "next/headers";

export default function test() {
    const headerRequest = headers()
    const userInfo = JSON.parse(headerRequest.get('user'))
    console.log('check user ', userInfo)

    return (
        <div>
            test page
        </div>
    )
}