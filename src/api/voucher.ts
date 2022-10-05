import { axiosPrivate } from './axios';

class VoucherAPI {
  static FindVoucherByUserID() {
    return axiosPrivate.get('/vouchers');
  }
}

export default VoucherAPI;
