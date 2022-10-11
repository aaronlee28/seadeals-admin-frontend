import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useCheckLogged = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token:any = localStorage.getItem('access_token');
    if (token !== null) {
      const dateNow = new Date();
      const decode:any = jwt_decode(token);
      if (decode.exp * 1000 < dateNow.getTime()) {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, []);
};

export default useCheckLogged;
