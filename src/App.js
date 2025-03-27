import React, { useEffect } from 'react';
import './App.css';
import ThemeRoutes from './routes/index';
import ScrollTop from './components/scrollTop';
// import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider} from './components/Context/AuthContext'; // Import your AuthProvider
import { useAuth } from './components/Context/AuthContext';
import Login from './pages/ResuableComponents/Login/Login' // Import your Login component
import { RoleProvider } from './components/Context/RoleContext';
// import { ChatEngine } from 'react-chat-engine';

function App() {
  const { state } = useAuth(); // Access the authentication state from the context
  useEffect(() => {
    fetch("http://localhost:8081/admin")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
  },[]);

  return (
   
    <RoleProvider>
      <AuthProvider>
        <ScrollTop>
          <AppContent />
          {!state.isAuthenticated && <Login />}
        </ScrollTop>
      </AuthProvider>
      </RoleProvider>
  );
}

function AppContent() {
  return <ThemeRoutes />;
}

export default App;