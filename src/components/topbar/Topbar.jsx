import React from "react"
import "./topbar.css"
import { LanguageRounded, NotificationsOutlined, Settings } from "@mui/icons-material"

const Topbar = () => {
  const userRole = localStorage.getItem('userRole');
  return (
    <>
      <div className='tobar'>
        <div className='topbarWrapper'>
          <div className='topLeft'>
            <span className='logo'>Dashboad</span>
            <span className='logo' style={{marginLeft: '6rem'}}>Welcome {userRole} 👋</span>
          </div>
          <div className='topRight'>
            <div className='topbarIconsContainer'>
              <NotificationsOutlined />
              <span className='topIconBadge'>2</span>
            </div>
            <div className='topbarIconsContainer'>
              <LanguageRounded />
              <span className='topIconBadge'>2</span>
            </div>
            <div className='topbarIconsContainer'>
              <Settings />
            </div>
            <img src='https://hdqwalls.com/wallpapers/thanos-avengers-infinity-4k-z8.jpg' alt='' className='topAvatar' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Topbar
