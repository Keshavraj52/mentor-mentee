import React, { useEffect, useState } from "react"
import "./ProductsList.css"
import { DataGrid } from "@mui/x-data-grid"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
// import { UserRows } from "../../Data"
import { Link } from "react-router-dom"
import { ApiConfig } from "../../components/ApiConfig"

const MenteeList = () => {
  const [menteeData, setMenteeData] = useState([]);
  
    useEffect(() => {
        // Fetch staff data when the component mounts
        fetch(ApiConfig.menteeList)
          .then((response) => response.json())
          .then((data) => setMenteeData(data))
          .catch((error) => console.error('Error fetching staff data:', error));
      }, []);

 
  const handleDelete = (id) => {
    setMenteeData(menteeData.filter((menteeMember) => menteeMember.id !== id));
};

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'department', headerName: 'Department', flex: 1 },
    { field: 'mentor_uid', headerName: 'Mentor ID', flex: 1 },
    { field: 'year', headerName: 'Year', flex: 1 },
    { field: 'achievements', headerName: 'Achievements', flex: 1 },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params) => (
            <>
            <Link to={`/mentee/${params.row.id}`} state={menteeData}>
              <button className='ProductsListEdit'>Edit</button>
            </Link>
            <DeleteOutlineIcon className='ProductsListDelete' onClick={() => handleDelete(params.row.id)} />
            </>
        ),
    },
];

return (
    <div className="ProductsList">
        <h2>Mentee List</h2>
        <div style={{ height: 650, width: '100%' }}>
            <DataGrid rows={menteeData} columns={columns} pageSize={10} rowsPerPageOptions={[5,10,25]} getRowId={(row) => row._id} />
        </div>
    </div>
);
};

export default MenteeList
