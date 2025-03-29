import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UsersList from './components/UsersList';
import { UserProvider } from './context/UserContext';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <UserProvider> {}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} /> {/* Handles 404 cases */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
