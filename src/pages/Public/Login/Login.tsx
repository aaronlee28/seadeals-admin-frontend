import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './Login.scss';
import logo from '../../../assets/images/logo.png';
import Button from '../../../components/Button/Button';
import axios from '../../../api/axios';

const LOGIN_URL = '/sign-in';

const Login = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname;

  const handleSubmit = async () => {
    const response = await axios.post(
      LOGIN_URL,
      JSON.stringify({ email, password }),
      {
        withCredentials: true,
      },
    );
    const decode:any = jwt_decode(response.data.data.id_token);
    const accessToken = response?.data?.data.id_token;
    const { user, scope } = decode;
    console.log(user);

    setAuth({ user, roles: scope.split(' '), accessToken });
    localStorage.setItem('access_token', accessToken);

    setEmail('');
    setPassword('');

    if (scope.includes('seller')) {
      navigate('/seller/', { replace: true });
      return;
    }
    if (scope.includes('admin')) {
      navigate('/admin/', { replace: true });
      return;
    }

    try {
      const sellerDetail = await axios.get(
        `seller/${user.user_id}`,
        {
          withCredentials: true,
        },
      );
      if (sellerDetail !== null) {
        navigate(from, { replace: true });
        return;
      }
      console.log(sellerDetail);
    } catch (error) {
      navigate('/seller/register', { replace: true });
    }
    navigate('/seller/register', { replace: true });
  };

  // mock token
  const sellerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTZWEgRGVhbHMiLCJleHAiOjE2NjQ4Nzc3MDMsImlhdCI6MTY2NDg3NjgwMywidXNlciI6eyJ1c2VyX2lkIjoyLCJlbWFpbCI6ImFsaWNlLmRvZUBtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWxpY2UuZG9lIiwid2FsbGV0X2lkIjoyfSwic2NvcGUiOiJ1c2VyIHNlbGxlciIsInR5cGUiOiJhY2Nlc3NfdG9rZW4ifQ.A3hw2_QcOU2qEC0MeXrfaQA-U09K5AW3fEO9-KD9-es';
  const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTZWEgRGVhbHMiLCJleHAiOjE3NjQ4MDA5MzQsImlhdCI6MTY2NDcxNDUzNCwidXNlciI6eyJ1c2VyX2lkIjoyLCJlbWFpbCI6ImFsaWNlLmRvZUBtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWxpY2UuZG9lIiwid2FsbGV0X2lkIjoyfSwic2NvcGUiOiJhZG1pbiIsInR5cGUiOiJhY2Nlc3NfdG9rZW4ifQ.ebJ4-5zMiSQRGYWTjixhFkCnLdpqIpdIcmq7bCVzSAM';
  const basicUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTZWEgRGVhbHMiLCJleHAiOjE3NjQ4MDA5MzQsImlhdCI6MTY2NDcxNDUzNCwidXNlciI6eyJ1c2VyX2lkIjoyLCJlbWFpbCI6ImFsaWNlLmRvZUBtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWxpY2UuZG9lIiwid2FsbGV0X2lkIjoyfSwic2NvcGUiOiJ1c2VyIiwidHlwZSI6ImFjY2Vzc190b2tlbiJ9.UGNLCF6UsYf_05o5SQFnRsts3LiWb6UknNGtlRVF3bg';

  const mockLogin = (token:string) => {
    const decode:any = jwt_decode(token);
    const { user, scope } = decode;
    const accessToken = token;
    localStorage.setItem('access_token', accessToken);
    setAuth({ user, roles: scope.split(' '), accessToken });

    if (!from && scope.split(' ').find((role:string) => ['admin'].includes(role))) {
      from = '/admin';
    }
    if (!from && scope.split(' ').find((role:string) => ['seller'].includes(role))) {
      from = '/seller';
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="login_container">
      <div className="login_cards row">
        <div className="logo col-6">
          <img alt="" className="img-fluid" src={logo} />
        </div>
        <div className="forms_container col-6">
          <div className="login_forms">
            <p className="p-4"><b>Log in ke Sea Deals Seller Center</b></p>
            <input type="text" placeholder="Email" className="form-control mb-2" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder="Kata sandi" className="form-control mb-2" value={password} onChange={(event) => setPassword(event.target.value)} />
            <Button buttonType="primary" text="Login" handleClickedButton={handleSubmit} />
            <div className="hr-sect"><b>ATAU</b></div>
            <p id="daftar-text">
              Belum punya akun SeaDeals?
              {' '}
              <a href="/register" id="daftar-link"><b>Daftar</b></a>
            </p>
            <button type="button" className="btn mock-button border d-block mb-2" onClick={() => { mockLogin(adminToken); }}>
              Mock Login as Admin
            </button>
            <button type="button" className="btn mock-button border d-block mb-2" onClick={() => { mockLogin(sellerToken); }}>
              Mock Login as Seller
            </button>
            <button type="button" className="btn mock-button border d-block mb-2" onClick={() => { mockLogin(basicUserToken); }}>
              Mock Login as Basic User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
