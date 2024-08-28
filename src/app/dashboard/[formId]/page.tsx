import FormUserToField from '@/components/FormUserToField'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'

interface Props {}
interface FormProps {
  params:{
      formId: string
  }
}
const Page = ({ params}: FormProps) => {
  const { formId } = params

  return (
    <MaxWidthWrapper>
      <FormUserToField id={formId}/>
    </MaxWidthWrapper>
  )
}

export default Page