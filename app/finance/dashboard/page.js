import { getAllData } from './actions';
import { getUserInfo } from '../action';
import { getTransectionLists } from '@/app/util/ConvertData';
import { Suspense } from 'react';

import DashboardPage from '@/app/components/DashboardPage/DashboardPage';

export default async function Page() {
  const userInfo = await getUserInfo()
  const date = new Date()
  const currentMonth = date.toLocaleDateString("en-US", { month: 'short', year: 'numeric' })
  const data = await getAllData(userInfo.uuid, currentMonth);
  const convertData = getTransectionLists(data)

  return (
    <Suspense fallback={<div>Loading </div>}>
      <DashboardPage initialData={convertData} />
    </Suspense>
  );
}
