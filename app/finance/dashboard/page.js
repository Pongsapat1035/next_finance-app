import { headers } from "next/headers";
import Dashboard from "@/app/components/dashboard";

export default async function Page() {
  const headerRequest = await headers()
  const userInfo = JSON.parse(headerRequest.get('user'))
  console.log('check user ', userInfo)

  return (
    <>
      <Dashboard userData={userInfo}></Dashboard>
    </>
  )
}