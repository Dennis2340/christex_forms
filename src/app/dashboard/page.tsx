import FormDashboard from '@/components/FormDashboard'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Navbar from '@/components/Navbar'
import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
interface Props {}

const Page = async() => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <>
   <Navbar/>
  <MaxWidthWrapper>
    <FormDashboard user={user}/>
  </MaxWidthWrapper>
  </>
  )
}

export default Page