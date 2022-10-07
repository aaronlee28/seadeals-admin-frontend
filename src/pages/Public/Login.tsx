import React from 'react';
import jwt_decode from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname;

  // mock token
  const sellerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTZWEgRGVhbHMiLCJleHAiOjE2NjU5MzY1MjksImlhdCI6MTY2NTAzNjUyOSwidXNlciI6eyJ1c2VyX2lkIjoyLCJlbWFpbCI6ImRyLnNsZWVweTIxQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWxpY2UuZG9lIiwid2FsbGV0X2lkIjoyfSwic2NvcGUiOiJ1c2VyIHNlbGxlciIsInR5cGUiOiJhY2Nlc3NfdG9rZW4ifQ.GMwaLj3ka9wwf16Or5tdBeIcbSaKjsf1ePBx6jUWJTY';
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
    <div>
      <input type="text" placeholder="email" className="form-control" />
      <input type="password" placeholder="password" className="form-control" />
      <button type="button" className="btn border d-block" onClick={() => { mockLogin(adminToken); }}>
        Mock Login as Admin
      </button>
      <button type="button" className="btn border d-block" onClick={() => { mockLogin(sellerToken); }}>
        Mock Login as Seller
      </button>
      <button type="button" className="btn border d-block" onClick={() => { mockLogin(basicUserToken); }}>
        Mock Login as Basic User
      </button>
    </div>
  );
};

export default Login;
