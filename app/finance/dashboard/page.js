import { getAllData } from './actions';
import { getUserInfo } from '../action';
import { getTransectionLists } from '@/app/util/ConvertData';
import { Suspense } from 'react';

import DashboardPage from '@/app/components/DashboardPage/DashboardPage';
import DashboardSkeleton from '@/app/components/DashboardPage/skeleton/DashboardSkeleton';

export default async function Page() {
  const userInfo = await getUserInfo()
  const date = new Date()
  const currentMonth = date.toLocaleDateString("en-US", { month: 'short', year: 'numeric' })
  const data = await getAllData(userInfo.uuid, currentMonth);
  const convertData = getTransectionLists(data)

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardPage initialData={convertData}  />
    </Suspense>
  );
}
