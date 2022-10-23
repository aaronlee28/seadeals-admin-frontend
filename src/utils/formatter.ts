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

const FormatTitle = (title:any) => {
  if (!title) return title;
  const wordArr = title.split(' ');

  return wordArr.map((word:any) => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
};

export default { DisplayDatetime, DisplayPrice, FormatTitle };
