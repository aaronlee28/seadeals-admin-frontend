import './Register.scss';
import React, { useEffect, useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import toast from 'react-hot-toast';
import axios from '../../../api/axios';
import logo from '../../../assets/images/logo.png';
import logo_xs from '../../../assets/images/logo_xs.png';
import useAuth from '../../../hooks/useAuth';
import useCheckLogged from '../../../hooks/useCheckLogged';

const Register = () => {
  useCheckLogged();
  const [revealed, setRevealed] = useState(false);
  const [confirmPasswordVis, setConfirmPasswordVis] = useState(false);

  const handleReveal = () => {
    setRevealed(!revealed);
  };

  const handleCPVis = () => {
    setConfirmPasswordVis(!confirmPasswordVis);
  };

  const uRL = '/register';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('male');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [passwordCorrect, setPasswordCorrect] = useState(true);

  useEffect(() => {
    if (password !== confirmPassword && confirmPassword !== '') {
      setPasswordCorrect(false);
      return;
    }
    setPasswordCorrect(true);
  }, [password, confirmPassword]);

  const [passwordValidity, setPasswordValidity] = useState(true);
  useEffect(() => {
    if (password.includes(userName) && userName !== '') {
      setPasswordValidity(false);
      return;
    }
    setPasswordValidity(true);
  }, [userName]);

  const [userNameValidity, setUserNameValidity] = useState(true);
  useEffect(() => {
    if (userName.includes(' ')) {
      setUserNameValidity(false);
      return;
    }
    setUserNameValidity(true);
  }, [userName]);

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const googleUser = location.state;

  const handleSubmit = async () => {
    const toastLoading = toast.loading('Waiting for register');
    try {
      const response = await axios.post(
        uRL,
        JSON.stringify({
          email,
          password,
          username: userName,
          full_name: fullName,
          gender,
          phone: `+62${phone}`,
          birth_date: birthDate,
        }),
        {
          withCredentials: true,
        },
      );
      const decode:any = jwt_decode(response.data.data.data.id_token);
      const accessToken = response?.data?.data.data.id_token;
      const { user, scope } = decode;

      setAuth({ user, roles: scope.split(' '), accessToken });
      localStorage.setItem('access_token', accessToken);

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUserName('');
      setFullName('');
      setGender('');
      setPhone('');
      setBirthDate('');

      navigate('/seller/register', { replace: true });
    } catch (err:any) {
      toast.error(err.response?.data?.message);
      navigate('/register', { replace: true });
    } finally {
      toast.dismiss(toastLoading);
    }
  };

  useEffect(() => {
    if (googleUser) {
      setEmail(googleUser.email);
      setFullName(googleUser.name);
    }
  }, []);

  return (
    <div className="register_container">
      <div className="register_cards_container mx-3 mx-sm-5">
        <div className="register_cards row">
          <div className="logo-m d-block d-md-none col-12 col-md-6 py-2">
            <img alt="" className="img-fluid" src={logo_xs} />
          </div>
          <div className="logo d-none d-md-block col-12 col-md-6">
            <a href="/src/pages">
              <img alt="" className="register-logo-l img-fluid" src={logo} />
            </a>
          </div>
          <div className="col-12 col-md-6 mx-auto my-3 p-2 d-lg-block">
            <div>
              <h1 className="header mb-2">
                <b>
                  Daftar sebagai User
                </b>
              </h1>
              <div className="justify-content-center row">
                <form
                  className="register_form col-md-10"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit().then();
                  }}
                >
                  <input
                    className="form__input p-2 mb-2"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    id="email"
                    placeholder="Email"
                    autoComplete="new-password"
                    required
                  />
                  <div className="mb-2">
                    <div className="input-group suffix">
                      <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type={(revealed) ? 'text' : 'password'}
                        className={passwordValidity ? 'form__input p-2' : 'form__input p-2 is-invalid'}
                        placeholder="Kata sandi"
                        autoComplete="new-password"
                        required
                      />
                      <div className="input-group-addon" role="presentation" onClick={handleReveal}>
                        <span className="">
                          { !revealed ? <BsEyeSlash /> : <BsEye /> }
                        </span>
                      </div>
                    </div>
                    {
                        passwordValidity ? '' : (
                          <div id="invalid-password" className="invalid-feedback">
                            Password should not include username!
                          </div>
                        )
                      }
                  </div>
                  <div className="mb-2">
                    <div className="input-group suffix">
                      <input
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        type={(confirmPasswordVis) ? 'text' : 'password'}
                        name="confirm-password"
                        id="confirm-password"
                        className={passwordCorrect ? 'form__input p-2' : 'form__input p-2 is-invalid'}
                        placeholder="Ulang kata sandi"
                        autoComplete="new-password"
                        required
                      />
                      <div className="input-group-addon" role="presentation" onClick={handleCPVis}>
                        <span className="">
                          { !confirmPasswordVis ? <BsEyeSlash /> : <BsEye /> }
                        </span>
                      </div>
                    </div>
                    {
                      !passwordCorrect && (
                        <p id="invalid-password" className="text-accent">
                          {'Password doesn\'t match!'}
                        </p>
                      )
                    }
                  </div>
                  <div className="mb-2">
                    <input
                      className={userNameValidity ? 'form__input p-2' : 'form__input p-2 is-invalid'}
                      value={userName}
                      onChange={(event) => setUserName(event.target.value)}
                      type="text"
                      id="username"
                      placeholder="Username"
                      autoComplete="new-password"
                      required
                    />
                    {
                      userNameValidity ? '' : (
                        <div id="invalid-username" className="invalid-feedback">
                          Whitespaces aren&apos;t allowed in usernames!
                        </div>
                      )
                    }
                  </div>
                  <input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="form__input my-2"
                    type="text"
                    id="fullName"
                    placeholder="Nama lengkap"
                    autoComplete="new-password"
                    required
                  />
                  <select
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                    className="form-select mb-2"
                    aria-label="Jenis kelamin"
                  >
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                  <div className="input-group prefix">
                    <div className="input-group-addon">
                      <span className="" id="inputGroupPrepend">+62</span>
                    </div>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      type="tel"
                      className="form__input p-2"
                      id="validationCustomTelephone"
                      placeholder="Nomor ponsel"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </div>
                  <label className="birth-date my-0 p-0 mb-2">Tanggal lahir: </label>
                  <input
                    value={birthDate}
                    onChange={(event) => setBirthDate(event.target.value)}
                    className="form__input p-2 mb-2"
                    type="date"
                    id="birthDate"
                    required
                  />
                  <div className="mb-4">
                    <button className="register-button" type="submit"><b>Daftar</b></button>
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <p id="daftar-text">
                      Sudah punya akun SeaDeals?
                      {' '}
                      <a href="/login" id="daftar-link"><b>Masuk</b></a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
