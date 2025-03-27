import React from "react"
import Feature from "../../components/feature/Feature"
import WidgetL from "../../components/widgetLs/WidgetL"
import Widget from "../../components/widgetSm/Widget"
import Chart from "../../components/chart/Chart"
import { UserData } from "../../Data"
import "./home.css"

const Home = () => {
  const userRole = localStorage.getItem('userRole');
  return (
    <>
      <div className='home'>
        <Feature />
        {/* <div className='homeWidgets'>
          <Widget />
          <WidgetL />
          
        </div> */}
         {userRole === 'mentor' &&(<Widget />)}
        {(userRole !== 'mentee' && userRole !== 'mentor') && (
          
          <div className='homeWidgets'>
          <Widget />
          <WidgetL />
          
        </div>
        )}
        <Chart data={UserData} title='Student Personal Analysis' grid dataKey='skill score' />
      </div>
    </>
  )
}

export default Home
