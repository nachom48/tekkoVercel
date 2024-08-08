import React, { useContext } from 'react';
import { AuthContext } from '../../shared/reducers/authContext';

const ClientDashboard: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is not available. Make sure AuthProvider is correctly set up.');
  }

  const { logout } = authContext;

  const handleLogout = () => {
    logout();
    // Redirigir al usuario a la página de login u otra página después del logout si es necesario
  };

  return (
    <div>
      <h1>Client Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      {/* Aquí va el contenido del dashboard del cliente */}
    </div>
  );
};

export default ClientDashboard;
