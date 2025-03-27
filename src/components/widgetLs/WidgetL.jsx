import React from "react"
import "./WidgetL.css"

const WidgetL = () => {
  const Button = ({ type }) => {
    return <button className={"button " + type}>{type}</button>
  }
  return (
    <>
      <div className='WidgetL'>
        <h3>Leave and On-Duty</h3>

        <table className='WidgetLtable'>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>

          <tr>
            <td className='user'>
              <img src='https://hdqwalls.com/wallpapers/thanos-avengers-infinity-4k-z8.jpg' alt='' />
              <span>Dhanush</span>
            </td>
            <td className='date'>20 october 2023</td>
            <td className='amount'>Fever</td>
            <td className='status'>
              <Button type='Approved' />
            </td>
          </tr>
          <tr>
            <td className='user'>
              <img src='https://hdqwalls.com/wallpapers/thanos-avengers-infinity-4k-z8.jpg' alt='' />
              <span>Ganesh</span>
            </td>
            <td className='date'>21 october 2023</td>
            <td className='amount'>Competition</td>
            <td className='status'>
              <Button type='Pending' />
            </td>
          </tr>
          <tr>
            <td className='user'>
              <img src='https://hdqwalls.com/wallpapers/thanos-avengers-infinity-4k-z8.jpg' alt='' />
              <span>Balaji</span>
            </td>
            <td className='date'>18 October 2023</td>
            <td className='amount'>sick leave</td>
            <td className='status'>
              <Button type='Declined' />
            </td>
          </tr>
          {/* <tr>
            <td className='user'>
              <img src='https://hdqwalls.com/wallpapers/thanos-avengers-infinity-4k-z8.jpg' alt='' />
              <span>Susan Carol</span>
            </td>
            <td className='date'>2 April 2022</td>
            <td className='amount'>$122.00</td>
            <td className='status'>
              <Button type='Approved' />
            </td>
          </tr> */}
        </table>
      </div>
    </>
  )
}

export default WidgetL
