import Signup from '<@>/components/auth/Signup'
import { withAuth } from '<@>/components/auth/WithAuth'
import React from 'react'

const SignupPage = () => {
  return (
    <Signup/>
  )
}

export default withAuth(SignupPage)