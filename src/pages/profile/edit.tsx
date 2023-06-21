import Edit from '<@>/components/profile/Edit'
import { withAuth } from '<@>/components/profile/WithAuth'
import React from 'react'

const EditProfilePage = () => {
  return (
    <Edit/>
  )
}

export default withAuth(EditProfilePage)