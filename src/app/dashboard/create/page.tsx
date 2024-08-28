import FormBuilder from '@/components/FormBuilder'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Navbar from '@/components/Navbar'
import React from 'react'

interface Props {}

const Page = () => {
  return (
    <>
    <Navbar/>
     <MaxWidthWrapper>
        <FormBuilder/>
     </MaxWidthWrapper>
    </>
  )
}

export default Page