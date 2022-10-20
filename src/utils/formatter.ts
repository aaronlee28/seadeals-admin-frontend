const DisplayDatetime = (time: string) => {
  const { length } = time;
  if (length === 27) {
    return time.replace('T', ' ').substring(0, length - 11);
  }
  return time.replace('T', ' ').substring(0, length - 4);
};

const DisplayPrice = (price: number) => {
  const str = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price || 0);
  return str.substring(0, str.length - 3);
};

export default { DisplayDatetime, DisplayPrice };
