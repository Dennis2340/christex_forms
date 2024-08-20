import FormBuilder from '@/components/FormBuilder'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'

interface Props {}

const Page = () => {
  return (
    <>
     <MaxWidthWrapper>
        <FormBuilder/>
     </MaxWidthWrapper>
    </>
  )
}

export default Page