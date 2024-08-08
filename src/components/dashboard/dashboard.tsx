import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../shared/reducers/authContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext) {
      // Maneja el caso en el que AuthContext no está disponible
      navigate('/new-route');
    }
  }, [authContext, navigate]);

  if (!authContext) {
    // Retornar null o un loader mientras se verifica el contexto de autenticación
    return null;
  }

  const { user, logout } = authContext;

  return (
    <div>
      <h1>Welcome, {user ? user.name : 'User'}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
