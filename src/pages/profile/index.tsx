import Profile from '<@>/components/profile/Profile'
import { withAuth } from '<@>/components/profile/WithAuth'
import React from 'react'

const EditProfilePage = () => {
  return (
    <Profile/>
  )
}

export default withAuth(EditProfilePage)