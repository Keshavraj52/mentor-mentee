import React from "react"
import "./Widget.css"
import VisibilityIcon from "@mui/icons-material/Visibility"
const Widget = () => {
  return (
    <>
      <div className='widgetSm'>
        <span className='widgetSmTitle'>Document Verification</span>
        <ul>
        <li style={{borderTop: '1px solid black', paddingTop:'10px'}}>
            <img src='https://hdqwalls.com/wallpapers/thanos-avengers-infinity-4k-z8.jpg' alt='' />
            <div className='widgetUser'>
              <span className='widgetUsername'>Dhanush</span>
              <span className='widgetUserTitle'>CSBS</span>
            </div>
            <button>
              <VisibilityIcon className='widgeStIcon' />
              Display
            </button>
          </li>
          <li style={{borderTop: '1px solid black', paddingTop:'10px'}}>
            <img src='https://hdqwalls.com/wallpapers/thanos-avengers-infinity-4k-z8.jpg' alt='' />
            <div className='widgetUser'>
              <span className='widgetUsername'>Balaji</span>
              <span className='widgetUserTitle'> CSBS </span>
            </div>
            <button>
              <VisibilityIcon className='widgeStIcon' />
              Display
            </button>
          </li>
          <li style={{borderTop: '1px solid black', paddingTop:'10px'}}>
            <img src='https://hdqwalls.com/wallpapers/thanos-avengers-infinity-4k-z8.jpg' alt='' />
            <div className='widgetUser'>
              <span className='widgetUsername'>Ganesh</span>
              <span className='widgetUserTitle'>CSBS</span>
            </div>
            <button>
              <VisibilityIcon className='widgeStIcon' />
              Display
            </button>
          </li>
          {/* <li>
            <img src='https://hdqwalls.com/wallpapers/thanos-avengers-infinity-4k-z8.jpg' alt='' />
            <div className='widgetUser'>
              <span className='widgetUsername'>Anna Keller</span>
              <span className='widgetUserTitle'>Software WEnginner</span>
            </div>
            <button>
              <VisibilityIcon className='widgeStIcon' />
              Display
            </button>
          </li>
          <li>
            <img src='https://hdqwalls.com/wallpapers/thanos-avengers-infinity-4k-z8.jpg' alt='' />
            <div className='widgetUser'>
              <span className='widgetUsername'>Anna Keller</span>
              <span className='widgetUserTitle'>Software WEnginner</span>
            </div>
            <button>
              <VisibilityIcon className='widgeStIcon' />
              Display
            </button>
          </li> */}
        </ul>
      </div>
    </>
  )
}

export default Widget
