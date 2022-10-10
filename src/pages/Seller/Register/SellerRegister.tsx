import React, { useEffect, useState } from 'react';
import './SellerRegister.scss';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Button from '../../../components/Button/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Cities from '../../../api/cities';
import Modal from '../../../components/Modal/Modal';
import useCheckLogged from '../../../hooks/useCheckLogged';

const SellerRegister = () => {
  useCheckLogged();
  const uRLSellers = '/sellers';
  const uRLAddress = '/user/profiles/addresses';
  const [userId, setUserId] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const getUserId = () => {
    const token = localStorage.getItem('access_token');
    if (token !== null) {
      // @ts-ignore
      setUserId(jwt_decode(token).user.user_id);
    }
  };

  const [cityId, setCityId] = useState('');
  const [provinceId, setProvinceId] = useState('');
  const [type, setType] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const getAllProvince = async () => {
    await Cities.GetAllCities()
      .then((resp) => {
        const res = resp.data;
        let provinceIds: any[] = [];
        let provincesValues: any[] = [];
        for (let i = 0; i < res.length; i += 1) {
          const p = {
            province_id: res[i].province_id,
            province_name: res[i].province,
          };
          if (!provinceIds.includes(p.province_id)) {
            provinceIds = [...provinceIds, p.province_id];
            provincesValues = [...provincesValues, p];
          }
        }
        setProvinces(provincesValues);
      })
      .catch((err) => err);
  };

  const getCities = async () => {
    await Cities.GetAllCities()
      .then((resp) => {
        const res = resp.data;
        let values: any[] = [];
        for (let i = 0; i < res.length; i += 1) {
          const c = {
            province_id: res[i].province_id,
            province_name: res[i].province,
            city_id: res[i].city_id,
            city_name: res[i].city_name,
            type: res[i].type,
            isChecked: false,
          };
          if (province === c.province_name) {
            values = [...values, c];
          }
        }
        setCities(values);
      })
      .catch((err) => err);
  };

  const getProvinceId = (p:string) => {
    for (let i = 0; i < provinces.length; i += 1) {
      if (provinces[i].province_name === p) {
        return provinces[i].province_id;
      }
    }
    return 0;
  };

  const getCityId = (p:string) => {
    for (let i = 0; i < cities.length; i += 1) {
      if (cities[i].city_name === p) {
        return cities[i].city_id;
      }
    }
    return 0;
  };

  const getCityType = (p:string) => {
    for (let i = 0; i < cities.length; i += 1) {
      if (cities[i].city_name === p) {
        return cities[i].type;
      }
    }
    return '';
  };

  useEffect(() => {
    getAllProvince();
  }, []);

  useEffect(() => {
    if (province !== '') {
      getCities();
      setCity(province);
      setCityId(getCityId(province));
      setType(getCityType(province));
    }
  }, [province]);

  useEffect(() => {
    // @ts-ignore
    if (cities.length > 0) {
      setCity(cities[0].city_name);
      setCityId(cities[0].city_id);
      setType(cities[0].type);
    }
  }, [cities]);

  const handleSubmitModal = () => {
    try {
      axiosPrivate.post(
        uRLAddress,
        JSON.stringify({
          province_id: provinceId,
          province,
          city_id: cityId,
          type,
          city,
          postal_code: postalCode,
          sub_district: subDistrict,
          address,
        }),
      );
      setShow(false);
    } catch (err) {
      navigate('/user', { replace: true });
    }
  };

  const handleSelectProvince = (e: any) => {
    setProvince(e.target.value);
    setProvinceId(getProvinceId(e.target.value));
  };

  const handleSelectCity = (e: any) => {
    setCity(e.target.value);
    setCityId(getCityId(e.target.value));
    setType(getCityType(e.target.value));
  };

  const [mainAddress, setMainAddress] = useState(false);
  const [addressChecked, setAddressChecked] = useState(false);
  const checkMainAddress = () => {
    try {
      axiosPrivate.get(
        uRLAddress,
      ).then((res: any) => {
        if (res.data.data.length > 0) {
          setMainAddress(true);
        }
        setAddressChecked(true);
      });
    } catch (err) {
      navigate('/seller/register', { replace: true });
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId !== '') {
      checkMainAddress();
    }
  }, [userId]);

  useEffect(() => {
    if (!mainAddress && addressChecked) {
      setShow(true);
    }
  }, [addressChecked]);

  const [shopName, setShopName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    try {
      axiosPrivate.post(
        uRLSellers,
        JSON.stringify({
          user_id: userId,
          shop_name: shopName,
          description,
        }),
      );
      navigate('/seller/register/couriers', { replace: true });
    } catch (err) {
      navigate('/seller/register', { replace: true });
    }
  };

  return (
    <div className="seller-register_container">
      <div className="registration-form-card">
        <div className="header"><p className="header-text">Atur informasi toko</p></div>
        {show && (
        <Modal cancel={handleClose}>
          <div className="d-flex flex-column p-4 w-75">
            <h5 className="text-start mb-4 text-main"><b>Alamat Baru</b></h5>
            <div>
              <form>
                <select className="form-select mb-2" onChange={handleSelectProvince} defaultValue={province}>
                  {provinces.map((prov) => (
                    <option
                      key={prov.province_id}
                      value={prov.province_name}
                    >
                      {prov.province_name}
                    </option>
                  ))}
                </select>
                {
                  province && (
                    <select className="form-select mb-2" onChange={handleSelectCity} defaultValue={city}>
                      {cities.map((ci) => (
                        <option
                          key={ci.city_id}
                          value={ci.city_name}
                        >
                          {ci.city_name}
                        </option>
                      ))}
                    </select>
                  )
                }
                <input
                  className="form-control mb-2"
                  value={subDistrict}
                  onChange={(event) => setSubDistrict(event.target.value)}
                  id="sub-district"
                  placeholder="Kecamatan"
                  autoComplete="new-password"
                  required
                />
                <input
                  className="form-control mb-2"
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.target.value)}
                  id="postal-code"
                  placeholder="Kode Pos"
                  autoComplete="new-password"
                  required
                />
                <textarea
                  className="form-control mb-2"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  id="address"
                  placeholder="Isi alamat lengkap"
                  autoComplete="new-password"
                  required
                />
              </form>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button buttonType="primary alt" text="Tutup" handleClickedButton={handleClose} />
              <Button buttonType="primary" text="Simpan alamat" handleClickedButton={handleSubmitModal} />
            </div>
          </div>
        </Modal>
        )}
        <div className="input-groups">
          <div className="input-group row">
            <div className="col-2">Nama toko:</div>
            <div className="col-10"><input type="text" placeholder="Nama toko" className="form-control" value={shopName} onChange={(event) => setShopName(event.target.value)} /></div>
          </div>
          <div className="input-group row">
            <div className="col-2">Deskripsi:</div>
            <div className="col-10"><textarea placeholder="Deskripsi" className="form-control" value={description} onChange={(event) => setDescription(event.target.value)} /></div>
          </div>
        </div>
        <div className="button-group">
          <Button buttonType="primary alt" text="Lanjut ke atur jasa kurir" handleClickedButton={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
export default SellerRegister;
