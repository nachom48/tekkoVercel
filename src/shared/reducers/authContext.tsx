import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserDTO from '../../modules/userManagement/user/dto/user.dto';
import { UserRole } from '../enumerations/userRole.enum';

interface AuthContextProps {
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  responseFacebook: (response: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  error: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [error,setError]=useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setError('');
    try {
      // const response = await axios.post('api/auth/regularLogin', { email, password });
      const response = { data:{access_token: 'mdaisdmaidmsaidmasodmadomasadsdasdasdasdadsa'}}
      console.log("esto teno de resposne dsp de logearme regularmente",response)

      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      // const userResponse = await axios.get('api/auth/profile', {
      //   headers: {
      //     Authorization: `Bearer ${access_token}`,
      //   },
      // });
      const user : UserDTO = {
        activated :true,
        email : email,
        firstName: 'Ignacio',
        lastName : 'Muñoz',
        login : email,
        role : UserRole.CLIENT,
        verificationCode : 123123,
        password : password,
        id : '8923892209390232232309203'
      }
      setUser(user); // Actualiza el usuario aquí
      navigateToDashboard(user.role!);
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.')
      console.error('Error al iniciar sesión:', error);
    }
  };

  const responseFacebook = async (response: any) => {
    try {
      const facebookResponse = await axios.post('api/auth/facebook', { accessToken: response.accessToken, userID: response.userID });
      const { access_token } = facebookResponse.data;
      localStorage.setItem('token', access_token);
      const userResponse = await axios.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setUser(userResponse.data); // Actualiza el usuario aquí
      navigateToDashboard(userResponse.data.role);
    } catch (error) {
      console.error('Error al autenticar con Facebook:', error);
      // Manejar el error de autenticación con Facebook aquí
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null); // Limpia el usuario en el logout
  };

  const navigateToDashboard = (role: string) => {
    console.log("entro aca a navegar",role)
    switch (role) {
      case 'client':
        navigate('/dashboard-cliente');
        break;
      case 'provider':
        navigate('/dashboard-proveedor');
        break;
      case 'Admin':
        navigate('/dashboard-admin');
        break;
      default:
        navigate('/login');
        break;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, responseFacebook, logout, loading, setUser,error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
