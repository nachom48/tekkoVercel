import React, { useContext, useEffect, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/reducers/authContext';

interface PrivateRouteProps {
  element: ReactElement;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles }) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext?.loading) {
      if (!authContext?.isAuthenticated) {
        navigate('/login');
      } else if (roles && roles.indexOf(authContext.user.role) === -1) {
        navigate('/unauthorized');
      }
    }
  }, [authContext, navigate, roles]);

  if (authContext?.loading) {
    return <div>Loading...</div>;
  }

  return element;
};

export default PrivateRoute;
