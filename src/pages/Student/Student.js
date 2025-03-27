import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './Student.css';
import { ApiConfig } from '../../components/ApiConfig';

const Student = () => {
    const [studentData, setStudentData] = useState([]);
    const id = localStorage.getItem('id');

    useEffect(() => {
        getData();
    }, []); // Add dependency array to avoid infinite re-renders

    async function getData() {
        try {
            const response = await fetch(ApiConfig.mentorStudentList, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mentorUid: id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("API Response Data:", data);
                setStudentData(data);
            } else {
                console.error("Failed to fetch data:", response.statusText);
            }
        } catch (error) {
            console.error("Error during API call:", error);
        }
    }

    const columns = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'department', headerName: 'Department', flex: 1 },
        { field: 'year', headerName: 'Year', flex: 1 },
        { field: 'achievements', headerName: 'Achievements (DONE or NOT)', flex: 1 },
    ];

    return (
        <div className="student">
            <h2>Student List</h2>
            <div style={{ height: 650, width: '100%' }}>
                <DataGrid 
                    rows={studentData.map((row, index) => ({ ...row, id: row._id || index + 1 }))} 
                    columns={columns} 
                    pageSize={10} 
                    rowsPerPageOptions={[5, 10, 25]} 
                />
            </div>
        </div>
    );
};

export default Student;
