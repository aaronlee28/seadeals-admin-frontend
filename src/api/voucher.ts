class VoucherAPI {
  static FindVoucherByUserID(ax:any, filter:any) {
    return ax.get(`/vouchers?${filter}`);
  }
}

export default VoucherAPI;
