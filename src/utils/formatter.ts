const DisplayDatetime = (time: string) => {
  const { length } = time;
  return time.replace('T', ' ').substring(0, length - 4);
};

const DisplayPrice = (price: number) => {
  const priceSplit = price.toString().split(/(?=(?:\d{3})+(?:\.|$))/g);
  return `Rp. ${priceSplit.join('.')}`;
};

export default { DisplayDatetime, DisplayPrice };
