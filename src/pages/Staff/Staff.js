import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './Staff.css';
// import { Link } from "react-router-dom"

const Staff = () => {
    const [staffData, setStaffData] = useState([]);

    useEffect(() => {
        // Fetch staff data when the component mounts
        fetch('http://localhost:8081/mentorlist')
            .then((response) => response.json())
            .then((data) => {
                // Add sequential IDs to each staff member
                const dataWithIds = data.map((staff, index) => ({
                    ...staff,
                    id: index + 1, // Generate a sequential ID starting from 1
                }));
                setStaffData(dataWithIds);
            })
            .catch((error) => console.error('Error fetching staff data:', error));
    }, []);

    console.log("staffdata : ", staffData);
// const handleDelete = (id) => {
    //     setStaffData(staffData.filter((staffMember) => staffMember.id !== id));
    // };

    // const handleEdit = (staff) => {
    //     // Set the selected staff member and pass it to the User.js component
    //     setSelectedStaff(staff);
    //   };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'department', headerName: 'Department', flex: 1 },
        { field: 'designation', headerName: 'Designation', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        {
            // field: 'actions',
            // headerName: 'Actions',
            // flex: 1,
            // renderCell: (params) => (
            //     <>
            //          <Link to={`/user/${params.row.id}`}>
            //             <button className='staffEdit'>Edit</button>
            //         </Link>
            //         <DeleteOutlineIcon className="staffDelete" onClick={() => handleDelete(params.row.id)} />
            //     </>
            // ),
        },
    ];

    return (
        <div className="staff">
            <h2>Staff List</h2>
            <div style={{ height: 650, width: '100%' }}>
                <DataGrid rows={staffData} columns={columns} pageSize={10} rowsPerPageOptions={[5, 10, 25]} />
            </div>
        </div>
    );
};

export default Staff;