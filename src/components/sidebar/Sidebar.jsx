import React from "react";
import { BarChart,TrendingUp, ChatBubbleOutline, DynamicFeed, LineStyle, PersonOutline, Storefront, Timeline, WorkOutline } from "@mui/icons-material";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Sidebar = () => {
  const userRole = localStorage.getItem('userRole');
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("authenticated");
    window.location.reload();
    navigate("/login");
  };

  return (
    <>
      <div className="sidebar">
        <div className="sideWrapper">
          <div className="sidebarMenu">
            <h3>Dashboard</h3>
            <ul className="sidebarList">
              <Link to="/" className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </Link>
              { userRole === "admin" && (
                <>
                  <Link to="/Staff" className="sidebarListItem">
                    <Timeline className="sidebarIcon" />
                    Staff
                  </Link>
                  </>
                  )}
                  { userRole === "mentor" && (
                    <>
                    <Link to="/Student" className="sidebarListItem">
                    <TrendingUp className="sidebarIcon" />
                    Students
                  </Link>
                  </>
                  )}
                  
              {/* Add more menu items based on the user's role */}
            </ul>
          </div>
          <div className="sidebarMenu">
          {(userRole === "admin" || userRole === "mentor" ) && (
            <h3>Quick Menu</h3>
          )}
            <ul className="sidebarList">
              { (userRole === "admin" && (
                <>
                  <Link to="/users" className="sidebarListItem">
                    <PersonOutline className="sidebarIcon" />
                    Add Staff
                  </Link>
                  <Link to="/mentees" className="sidebarListItem">
                    <Storefront className="sidebarIcon" />
                    Add Student
                  </Link>
                </>
              ))}
              { ((userRole === "admin" || userRole === "mentor") && (
                <>
                  <Link className="sidebarListItem">
                    <BarChart className="sidebarIcon" />
                    Reports
                  </Link>
                </>
              ))}
            </ul>
          </div>
          { userRole !== "admin" && (
            <>
              <div className="sidebarMenu">
                <h3>Approval</h3>
                <ul className="sidebarList">
                      {/* <Link className="sidebarListItem">
                        <MailOutline className="sidebarIcon" />
                        Leave
                      </Link> */}
                      {userRole === 'mentee' && (
                        
                          <Link to='/pdfupload' className="sidebarLink">
                            <WorkOutline className="sidebarIcon" />
                            upload
                          </Link>
                      )}
                      <Link to='/widget' className="sidebarListItem">
                        <DynamicFeed className="sidebarIcon" />
                        On Duty
                      </Link>
                      <Link to='/DirMsg' className="sidebarListItem">
                        <ChatBubbleOutline className="sidebarIcon" />
                        Messages
                      </Link>
                </ul>
              </div>
            </>
          )}
          <div className="sidebarMenu">
            <h3>Session</h3>
            <ul className="sidebarList">
              <Link className="sidebarLink" onClick={handleLogout}>
                <WorkOutline className="sidebarIcon" />
                Logout
              </Link>
            </ul>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Sidebar;