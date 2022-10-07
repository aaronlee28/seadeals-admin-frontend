class VoucherAPI {
  static FindVoucherByUserID(ax:any, filter:any) {
    return ax.get(`/vouchers?${filter}`);
  }

  static FindVoucherByID(ax:any, id:string = '') {
    return ax.get(`/vouchers/${id}`);
  }
}

export default VoucherAPI;
