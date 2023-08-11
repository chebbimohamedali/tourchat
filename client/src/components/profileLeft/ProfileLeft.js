import React from 'react'
import LogoSearch from '../logoSearch/LogoSearch'
import FollowersCard from '../followersCard/FollowersCard'
import InfoCard from '../infoCard/InfoCard'

const Profile = () => {
  return (
    <div className="profileLeft profileSide">
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  )
}

export default Profile
