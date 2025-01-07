import React from 'react'
import { CFormInput } from '@coreui/react'
import { IMaskMixin } from 'react-imask'



export const InputMaskPhone = () => {
  const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
    <CFormInput {...props} ref={inputRef} />
  ))
  return <CFormInputWithMask mask="+{94}(00)000-00-00" />
}

export const InputMaskCreditCard = () => {
  const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
    <CFormInput {...props} ref={inputRef} />
  ))
  return <CFormInputWithMask mask="0000 0000 0000 0000" />
}