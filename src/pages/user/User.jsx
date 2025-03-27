import { Publish } from "@mui/icons-material"
import React, { useState } from "react"
import "./user.css"
import { Link, useParams,useLocation, useNavigate } from "react-router-dom";

const User = () => {
  const { userId } = useParams();
  const navigate =useNavigate();
  console.log("used :",userId);
  const locationState = useLocation().state; // Access the state passed from the Link
  
  const [userData, setUserData] = useState(locationState);// State to hold user data
  console.log("data data : ",userData);
  const index = userId -1 ;
  const [name, setName] = useState(userData[index] ? userData[index].name : '');
  const [department, setDepartment] = useState(userData[index] ? userData[index].department : '');
  const [designation, setDesignation] = useState(userData[index] ? userData[index].Designation : '');
  const [email, setEmail] = useState(userData[index] ? userData[index].email : '');
  const [phone, setPhone] = useState(userData[index] ? userData[index].phone : '');
  console.log("name : ",name);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "department":
        setDepartment(value);
        break;
      case "designation":
        setDesignation(value);
        break;
      default:
        // Handle other input fields if needed
    }
  };

  console.log("user data: ",userData[index]);
  console.log("used after: ",userId);

  const handleUpdate = () => {
    if(name === '' || department === '' || designation === '' || email === '' || phone === '') return console.error("not be empty");
    // Create an object with updated data
    const updatedData = {
      name,
      department,
      designation,
      email,
      phone,
    };

    const updatedUserData = [...userData];

  // Update the specific user's data
    updatedUserData[index] = updatedData;

    fetch(`http://localhost:8081/staffupdate/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data updated successfully:", data);
        // Optionally, you can update the local state with the new data
        setUserData(updatedData);
      })
      .catch((error) => console.error('Error updating user data:', error));
      navigate('/users');
  };


  return (
    <>
      <div className='user'>
        <div className='userTitleContainer'>
          <h1>Edit User</h1>
          <Link to='/newUser'>
            <button>Create</button>
          </Link>
        </div>

        <div className='userContainer'>
          {/* <div className='userShow'>
            <div className='userShowTop'>
              <img src='https://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg?cs=srgb&dl=pexels-arnie-chou-1557843.jpg&fm=jpg' alt='' />
              <div className='userShowTopTitle'>
                <h3>Anna Becker</h3>
                <span>Software Enginner</span>
              </div>
            </div>
            <div className='userShowBottom'>
              <h3>Account Details</h3>
              <div className='userShowInfo'>
                <PermIdentity className='userShowIcon' />
                <span>annbace99</span>
              </div>
              <div className='userShowInfo'>
                <CalendarToday className='userShowIcon' />
                <span>1999.08.24</span>
              </div>
              <h3>Contact Details</h3>
              <div className='userShowInfo'>
                <PhoneAndroid className='userShowIcon' />
                <span>9813253082</span>
              </div>
              <div className='userShowInfo'>
                <MailOutline className='userShowIcon' />
                <span>annbace99@gmail.com</span>
              </div>
              <div className='userShowInfo'>
                <LocationSearching className='userShowIcon' />
                <span>New York </span>
              </div>
            </div>
          </div> */}
          <div className='userUpdate'>
            <h3>Edit</h3>
            <form action='' className='userUpdateForm'>
              <div className='userUpdateLeft'>
                <div className='userUpdateLeftItmes'>
                  <label>Name</label>
                  <input 
                  type='text' 
                  name="name"
                  placeholder='name here' 
                  value={name} 
                  className='userUpdateInput'
                  onChange={handleChange}
                   />
                </div>
                <div className='userUpdateLeftItmes'>
                  <label>Department</label>
                  <input 
                  type='text' 
                  name="dept"
                  placeholder='Department' 
                  value={department} 
                  className='userUpdateInput'
                  onChange={handleChange}
                   />
                </div>
                <div className='userUpdateLeftItmes'>
                  <label>Designation</label>
                  <input 
                  type='text' 
                  name="designation"
                  placeholder='Prof / AP' 
                  value={designation} 
                  className='userUpdateInput'
                  onChange={handleChange} 
                  />
                </div>
                <div className='userUpdateLeftItmes'>
                  <label>Email</label>
                  <input 
                  type='text' 
                  name="email"
                  placeholder='annabeck99@gmail.com ' 
                  value={email} 
                  className='userUpdateInput'
                  onChange={handleChange} 
                  />
                </div>
                <div className='userUpdateLeftItmes'>
                  <label>Phone</label>
                  <input 
                  type='text' 
                  name="phone"
                  placeholder='+ 123 456 7894' 
                  value={phone} 
                  className='userUpdateInput'
                  onChange={handleChange} 
                  />
                </div>
              </div>
              <div className='userUpdateRight'>
                <div className='userUpdateUpload'>
                  <img className='userUpdateImg' src='https://images.pexels.com/photos/1116380/pexels-photo-1116380.jpeg?cs=srgb&dl=pexels-ba-phi-1116380.jpg&fm=jpg' alt='' />
                  <label htmlFor='file'>
                    <Publish className='userUpdateIcon' />
                  </label>
                  <input type='file' id='file' style={{ display: "none" }} />
                </div>
                <button className='userUpdateButton' onClick={handleUpdate}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default User
