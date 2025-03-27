// import { ArrowDownward, ArrowUpward } from "@mui/icons-material"
import React, { useEffect, useState } from "react"
import { ApiConfig } from "../ApiConfig"
import "./feature.css"
// import { useAuth } from "../Context/AuthContext";

const Feature = () => {
  const [mentorCount, setMentorCount] = useState(0);
  const [menteeCount, setMenteeCount] = useState(0);
  const [hmenteeCount , setHmenteeCount] = useState(0);
  const userRole = localStorage.getItem('userRole');
  const id = localStorage.getItem('id');

  useEffect(() => {
    fetch(ApiConfig.mentorCount)
    .then((response) => response.json())
    .then((data) => setMentorCount(data.count))
    .catch((error) => console.error('Error fetching mentor count:', error));

  // Fetch mentee count
  fetch(ApiConfig.menteeCount)
    .then((response) => response.json())
    .then((data) => setMenteeCount(data.count))
    .catch((error) => console.error('Error fetching mentee count:', error));

    getData();

});

  async function getData(){
    try{
    const response = await fetch(ApiConfig.mentorStudentList, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mentorUid : id
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setHmenteeCount(data.length);
      }
  }catch (error) {
    console.error('Error during login:', error);
    // seterrorMessage('Something went wrong. Please try again.');
  }
  }

  return (
    <>
      <div className='feature'>
        {userRole === 'admin' && (
        <div className='featureItem'>
          <span className='featureTitel'>Total Staff</span>
          <div className='featuredMoneyContainer'>
            <span className='featureMoney'>{mentorCount}</span>
            {/* <span className='featureMoneyRate'>
              -11.4 <ArrowDownward className='featureIcon negative' />
            </span> */}
          </div>
          <span className='featuredSub'>More info</span>
        </div>
        ) }
        { (userRole === 'admin') && (
        <div className='featureItem'>
          <span className='featureTitel'>Total Students</span>
          <div className='featuredMoneyContainer'>
            <span className='featureMoney'>{menteeCount}</span>
            {/* <span className='featureMoneyRate'>
              -2.4 <ArrowDownward className='featureIcon negative' />
            </span> */}
          </div>
          <span className='featuredSub'>More info</span>
        </div>
        ) }

        { userRole === 'mentor' && (
          <div className='featureItem'>
          <span className='featureTitel'>Total Students</span>
          <div className='featuredMoneyContainer'>
            <span className='featureMoney'>{hmenteeCount}</span>
            {/* <span className='featureMoneyRate'>
              -2.4 <ArrowDownward className='featureIcon negative' />
            </span> */}
          </div>
          <span className='featuredSub'>More info</span>
        </div>
        )}
        
        { userRole !=="mentee" && (
          <div className='featureItem'>
          <span className='featureTitel'>leave</span>
          <div className='featuredMoneyContainer'>
            <span className='featureMoney'>0</span>
            {/* <span className='featureMoneyRate'>
              2.4 <ArrowUpward className='featureIcon postive' />
            </span> */}
          </div>
          <span className='featuredSub'>More info</span>
        </div>
        )}
        
      </div>

        <div className="feature">
          <div className='featureItem'>
            <span className='featureTitel'>Achivements</span>
            <div className='featuredMoneyContainer'>
              <span className='featureMoney'>10</span>
              {/* <span className='featureMoneyRate'>
                2.4 <ArrowUpward className='featureIcon postive' />
              </span> */}
            </div>
            <span className='featuredSub'>More info</span>
          </div>

          <div className='featureItem'>
            <span className='featureTitel'>OD Applied</span>
            <div className='featuredMoneyContainer'>
              <span className='featureMoney'>5</span>
              {/* <span className='featureMoneyRate'>
                2.4 <ArrowUpward className='featureIcon postive' />
              </span> */}
            </div>
            <span className='featuredSub'>More info</span>
          </div>

          {/* <div className='featureItem'>
            <span className='featureTitel'>No.Of Bookings</span>
            <div className='featuredMoneyContainer'>
              <span className='featureMoney'>0</span>
              {/* <span className='featureMoneyRate'>
                2.4 <ArrowUpward className='featureIcon postive' />
              </span> 
            </div>
            <span className='featuredSub'>More info</span>
          </div> */}
        </div>
    </>
  )
}

export default Feature
