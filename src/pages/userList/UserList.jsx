import React, { useEffect, useState } from "react"
import "./UserList.css"
import { DataGrid } from "@mui/x-data-grid"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
// import { UserRows } from "../../Data"
import { Link } from "react-router-dom"
import { ApiConfig } from "../../components/ApiConfig"

const UserList = () => {
  const [staffData, setStaffData] = useState([]);
  
    useEffect(() => {
        // Fetch staff data when the component mounts
        fetch(ApiConfig.mentorList)
          .then((response) => response.json())
          .then((data) => setStaffData(data))
          .catch((error) => console.error('Error fetching staff data:', error));
      }, []);

      // useEffect(() => {
      //   window.location.reload();
      // },[staffData]);
    
  //     console.log("staffdata : ",staffData);
  // const [data, setData] = useState(UserRows)
 
  const handleDelete = (id) => {
    setStaffData(staffData.filter((staffMember) => staffMember.id !== id));
};

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'department', headerName: 'Department', flex: 1 },
    { field: 'Designation', headerName: 'Designation', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params) => (
            <>
            <Link to={`/user/${params.row.id}`} state={staffData}>
              <button className='userListEdit'>Edit</button>
            </Link>
            <DeleteOutlineIcon className='userListDelete' onClick={() => handleDelete(params.row.id)} />
                 
            </>
        ),
    },
];

return (
    <div className="UserList">
        <h2>Staff List</h2>
        <div style={{ height: 650, width: '100%' }}>
            <DataGrid rows={staffData} columns={columns} pageSize={10} rowsPerPageOptions={[5,10,25]} getRowId={(row) => row._id} />
        </div>
    </div>
);
};

export default UserList
