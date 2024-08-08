import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../../../shared/reducers/authContext';
import { validateInput } from '../../../../../utils/formValidations';
import CustomInputFormik from '../../../../../components/customInputFormik/CustomInputFormik';

import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useFormik } from 'formik';
import { Button, Tabs, Tab } from '@nextui-org/react';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../../../../components/customButton/customButton';

type Key = string | number;

const Login: React.FC = () => {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [googleCredentials, setGoogleCredentials] = useState<any>(null);
  const [selected, setSelected] = React.useState<Key>("user");

  if (!authContext) {
    throw new Error('AuthContext is not available. Make sure AuthProvider is correctly set up.');
  }

  const { login, error } = authContext;

  useEffect(() => {
    const postGoogleCredentials = async () => {
      try {
        if (googleCredentials && typeof googleCredentials.credential === 'string') {
          await loginWithGoogle(googleCredentials.credential);
        }
      } catch (error) {
        console.error('Error al enviar credenciales a AuthService:', error);
        // Manejar el error de manera adecuada, por ejemplo, mostrando un mensaje al usuario
      }
    };

    if (googleCredentials) {
      postGoogleCredentials();
    }
  }, [googleCredentials]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => validateInput(values, ['email', 'password']),
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
      } catch (error) {
        console.log("entro aca xq hay error", error)
      }
    },
  });


  const loginWithGoogle = async (credential: string) => {
    console.log(credential)
    try {
      const response = await axios.post('api/auth/google', { token: credential });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      const userResponse = await axios.get('api/auth/profile', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      authContext.setUser(userResponse.data); 
      navigateToDashboard(userResponse.data.role);
    } catch (error) {
      console.error('Error al autenticar con Google:', error);
      // Manejar el error de autenticación con Google aquí
    }
  };

  const navigateToDashboard = (role: string) => {
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
    <div className='flex flex-col'>
      <div className="banner-auth">
        <div className='main-container-auth'>
          <div className='w-screen flex flex-col items-center gap-[4px] text-white pt-[3.5em] pb-[1em] lg:p-0'>
            <img src="/images/isologotipo.png" alt="isologotipo" width={'100px'} height={'auto'} className='z-1' />
            <h1 className='hidden lg:flex lg:text-display-xl'>¡Bienvenido a Tekko!</h1>
            <h2 className='hidden lg:flex lg:text-subheading'>Todos los servicios en un sólo lugar</h2>
          </div>
          <div className={`${selected === 'tekko' ? 'container-form-auth-tekko' : 'container-form-auth-user'}`}>
            <div className='flex flex-col gap-[6px]'>
              <h2 className='text-heading-m text-white'>Iniciar Sesión</h2>
              <p className='font-raleway font-semibold text-font-size-12 leading-line-height-18 text-yellow md:font-medium md:text-font-size-20 md:leading-line-height-28'>¡Bienvenido a Tekko! <span className='font-normal text-font-size-12 leading-line-height-18 text-light-grey md:font-medium md:text-font-size-20 md:leading-line-height-28'>Conectate con clientes y lleva tus servicios al siguiente nivel.</span></p>
            </div>
            <Tabs
              variant="bordered"
              aria-label="Options"                     
              selectedKey={selected}
              onSelectionChange={setSelected as (key: Key) => void}
              classNames={{
                tabList: 'border-[1px] border-light-grey',
                tabContent: 'text-light-grey group-data-[selected=true]:text-black', 
                cursor: 'bg-gradient-btn-primary',
                tab: 'p-[21px] text-button'
              }}>

              <Tab
                value="user"
                key="user"
                title="Soy usuario"
              >
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[12px] mb-[24px]">
                  <CustomInputFormik formik={formik}
                    iconType={faEnvelope}

                    inputName='email'
                    inputType='text'
                    placeholder='Email' />
                  <CustomInputFormik formik={formik}
                    iconType={faLock}
                    inputName='password'
                    inputType='password'
                    placeholder='Contraseña' />
                  <a href="" className='text-caption-link text-white self-end'>¿Olvidaste tu contraseña?</a>
                  <CustomButton formik={formik} label="Iniciar Sesión" />
                </form>


                <div className='flex flex-col items-center gap-[20px] mt-[32px]'>
                  <p className='text-subheading text-white'>Iniciar sesión con:</p>
                  <div className='mb-[12px] flex gap-[10px]'>
                    <GoogleLogin
                    
                      onSuccess={(credentialResponse) => {
                        setGoogleCredentials(credentialResponse);
                      }}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                      type='icon'
                      theme='outline'
                      logo_alignment='center'
                      shape='square'
                      size='large'
                    />
                    <button className="bg-white p-[10px] rounded-[4px]" onClick={() => { console.log('inicio con facebook') }}>
                      <img src="/images/facebook.png" alt="logo facebook" width={'20px'} height={'auto'} className='z-1  useOneTap' />
                    </button>
                  </div>
                  <p className='text-body text-white'>¿No tienes una cuenta? <Link to="/register-user" className='text-lemonYellow underline decoration-lemonYellow cursor-pointer'>Crea una aquí</Link></p>
                </div>
              </Tab>

              <Tab
                value="tekko"
                key="tekko"
                title="Soy profesional"
              >
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[12px] mb-[24px]">
                  <CustomInputFormik formik={formik}
                    iconType={faEnvelope}
                    inputName='email'
                    inputType='text'
                    placeholder='Email' />
                  <CustomInputFormik formik={formik}
                    iconType={faLock}
                    inputName='password'
                    inputType='password'
                    placeholder='Contraseña' />
                  <a href="" className='text-caption-link text-white self-end'>¿Olvidaste tu contraseña?</a>
                </form>

                <CustomButton formik={formik} label="Iniciar Sesión" />

                <div className='flex justify-center items-center mt-[32px]'>
                  <p className='text-body text-white'>¿No tienes una cuenta? <Link to="/register-tekko" className='text-yellow underline decoration-yellow cursor-pointer'>Crea una aquí</Link></p>
                </div>
              </Tab>
            </Tabs>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Login;
