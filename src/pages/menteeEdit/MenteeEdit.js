import { Publish } from "@mui/icons-material";
import React, { useState } from "react";
import "./MenteeEdit.css";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

function MenteeEdit() {
  const { menteeId } = useParams();
  const navigate = useNavigate();
  console.log("used:", menteeId);
  const locationState = useLocation().state;

  const [menteeData, setMenteeData] = useState(locationState);
  console.log("mentee data :",menteeData);
  const index = menteeId - 1;
  const [name, setName] = useState(menteeData[index] ? menteeData[index].name : '');
  const [department, setDepartment] = useState(menteeData[index] ? menteeData[index].department : '');
  const [year, setYear] = useState(menteeData[index] ? menteeData[index].year : '');
  const [achievements, setAcheivements] = useState(menteeData[index] ? menteeData[index].achievements : '');
  const [mentorId, setMentorId] = useState(menteeData[index] ? menteeData[index].mentor_uid : '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "year":
        setYear(value);
        break;
      case "achievements":
        setAcheivements(value);
        break;
      case "dept":
        setDepartment(value);
        break;
      case "mentorId":
        setMentorId(value);
        break;
      default:
        // Handle other input fields if needed
    }
  };

  const handleUpdate = () => {
    if (name === '' || department === '' || year === '' || mentorId === '' || achievements === '') {
      console.error("Fields should not be empty");
      return;
    }

    const menteeupData = {
      name,
      department,
      year,
      achievements,
      mentorId,
    };

    const updatedMenteeData = [...menteeData];
    updatedMenteeData[index] = menteeupData;

    fetch(`http://localhost:8081/menteeupdate/${menteeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menteeupData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data updated successfully:", data);
        setMenteeData(menteeupData);
      })
      .catch((error) => console.error('Error updating user data:', error));
      navigate('/mentees');
  }

  return (
    <>
      <div className='menteeEdit'>
        <div className='menteeEditTitleContainer'>
          <h1>Edit User</h1>
          <Link to='/newUser'>
            <button>Create</button>
          </Link>
        </div>

        <div className='menteeEditContainer'>
      
          <div className='menteeEditUpdate'>
            <h3>Edit</h3>
            <form action='' className='menteeEditUpdateForm'>
              <div className='menteeEditUpdateLeft'>
                <div className='menteeEditUpdateLeftItmes'>
                  <label>Name</label>
                  <input 
                  type='text' 
                  name="name"
                  placeholder='name here' 
                  value={name} 
                  className='menteeEditUpdateInput'
                  onChange={handleChange}
                   />
                </div>
                <div className='menteeEditUpdateLeftItmes'>
                  <label>Department</label>
                  <input 
                  type='text' 
                  name="dept"
                  placeholder='Department' 
                  value={department} 
                  className='menteeEditUpdateInput'
                  onChange={handleChange}
                   />
                </div>
                <div className='menteeEditUpdateLeftItmes'>
                  <label>Year</label>
                  <input 
                  type='text' 
                  name="year"
                  placeholder='Prof / AP' 
                  value={year} 
                  className='menteeEditUpdateInput'
                  onChange={handleChange} 
                  />
                </div>
                <div className='menteeEditUpdateLeftItmes'>
                  <label>Achievements</label>
                  <input 
                  type='text' 
                  name="achievements"
                  placeholder='annabeck99@gmail.com ' 
                  value={achievements} 
                  className='menteeEditUpdateInput'
                  onChange={handleChange} 
                  />
                </div>
                <div className='menteeEditUpdateLeftItmes'>
                  <label>Mentor ID</label>
                  <input 
                  type='text' 
                  name="mentorId"
                  placeholder='annabeck99@gmail.com ' 
                  value={mentorId} 
                  className='menteeEditUpdateInput'
                  onChange={handleChange} 
                  />
                </div>
                
              </div>
              <div className='menteeEditUpdateRight'>
                <div className='menteeEditUpdateUpload'>
                  <img className='menteeEditUpdateImg' src='https://images.pexels.com/photos/1116380/pexels-photo-1116380.jpeg?cs=srgb&dl=pexels-ba-phi-1116380.jpg&fm=jpg' alt='' />
                  <label htmlFor='file'>
                    <Publish className='menteeEditUpdateIcon' />
                  </label>
                  <input type='file' id='file' style={{ display: "none" }} />
                </div>
                <button className='menteeEditUpdateButton' onClick={handleUpdate}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default MenteeEdit;
