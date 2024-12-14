import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log('ProtectedRoute user:', user);

  useEffect(() => {
    if (user != null || user != undefined) {
      console.log('ProtectedRoute user not found:', user);
      navigate('/sign-in');
    }
  }, [user, navigate]);

  if (user === null || user === undefined) {
    console.log('ProtectedRoute user not found:', user);
    return null; // or a loading spinner
  }

  return children;
};

export default ProtectedRoute;