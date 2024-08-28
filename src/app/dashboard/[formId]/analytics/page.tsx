import AnalyticsResponse from '@/components/AnalyticsResponse'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Navbar from '@/components/Navbar'
import React from 'react'

interface Props {
  params:{
    formId: string
  } 
}

const Page = ({ params}: Props) => {
  const {formId } = params

  return (
    <>
    <Navbar/>
    <MaxWidthWrapper>
      <AnalyticsResponse formId={formId}/>
    </MaxWidthWrapper>
    </>
  )
}

export default Page