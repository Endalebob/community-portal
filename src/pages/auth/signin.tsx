import Signin from '<@>/components/auth/Signin'
import { withAuth } from '<@>/components/auth/WithAuth'
import React from 'react'

const SigninPage = () => {
  return (
    <Signin/>
  )
}

export default withAuth(SigninPage)